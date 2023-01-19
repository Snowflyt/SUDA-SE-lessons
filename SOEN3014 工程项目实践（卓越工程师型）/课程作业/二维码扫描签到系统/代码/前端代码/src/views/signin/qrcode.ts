export interface WwLoginOptions {
  id: string
  appid: string
  agentid: string
  redirect_uri: string
  state?: string
  href?: string
  lang?: 'zh' | 'en'
  is_mobile?: false
  self_redirect?: boolean
  business_type?: 'sso' | 'tww' | 'native' | 'twxg'
}
export interface WwLoginResponse {
  code: string
  appid: string
  state?: string
}
const allowedOrigins = ['work.weixin.qq.com', 'tencent.com']
const businessTypes = {
  sso: '/wwopen/sso/qrConnect',
  tww: '/login/wwLogin/sso/qrConnect',
  native: '/native/sso/qrConnect',
  twxg: '/login/wwLogin/sso/qrConnect'
}
const version = '1.2.7'

export default class WwLogin {
  async onSuccess(response: WwLoginResponse, frame: HTMLIFrameElement) {
    try {
      
    } catch (Error) {
      console.log(Error)
    }
  }
  private options: WwLoginOptions
  private frame?: HTMLIFrameElement

  constructor(options: WwLoginOptions) {
    if (!options.state) {
      options.state = options.id
    }
    this.options = options
    this.createFrame()
  }

  destroyed() {
    console.log('WwLogin had destroyed.')
    window.removeEventListener('message', this.onPostMessage)
  }

  getUrl(options: WwLoginOptions) {
    const params: string[] = []
    Object.entries(options).forEach(([key, value]) => {
      if (value !== null && value !== void 0) {
        if (
          ['string', 'number', 'boolean'].includes(typeof value) &&
          key !== 'id'
        ) {
          params.push(`${key}=${value}`)
        }
      }
    })
    params.push(`version=${version}`)
    params.push('login_type=jssdk')
    const businessType = businessTypes[options.business_type || 'sso']
    if (!businessType) {
      throw new Error(
        'Argument business_type not match. Current version is '.concat(
          version,
          '.'
        )
      )
    }
    const url = 'https://open.work.weixin.qq.com'
    return `${url}${businessType}?${params.join('&')}`
  }

  private createFrame() {
    this.frame = document.createElement('iframe')
    const element = document.querySelector(
      `#${this.options.id}`
    ) as HTMLDivElement
    this.frame.src = this.getUrl(this.options)
    this.frame.style.backgroundColor = 'transparent'
    this.frame.style.borderWidth = '0'
    this.frame.style.width = '300px'
    this.frame.style.height = '360px'
    this.frame.scrolling = 'no'
    this.frame.style.overflow = 'hidden'
    element.innerHTML = ''
    if (element.hasChildNodes()) {
      element.removeChild(element.children[0])
    }
    element.appendChild(this.frame)
    this.frame.onload = () => {
      window.addEventListener('message', this.onPostMessage)
      this.frame!.contentWindow!.postMessage(
        'ask_usePostMessage',
        'https://open.work.weixin.qq.com'
      )
    }
  }

  private onPostMessage = (event: MessageEvent) => {
    if (
      allowedOrigins.filter(e => new RegExp(`${e}$`).test(event.origin)).length
    ) {
      const searchParams = new URL(event.data).searchParams
      const response = (Object.fromEntries(
        searchParams
      ) as unknown) as WwLoginResponse
      if (response.state === this.options.state) {
        this.onSuccess && this.onSuccess(response, this.frame!)
      }
    }
  }
}
