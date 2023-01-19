<template>
  <div>
    <img v-show="!alreadySigned" :src="qrcodeUrl" class="qrcode" />
    <div v-show="alreadySigned">
      <img :src="avatar" class="avatar" />
      <div>{{ name }}完成了签到</div>
      <div>{{ countdown }}秒后刷新</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRCode from 'qrcode'
import { getSignInStatus, getSignedInUser } from '@/api/signin'
import { randomBytes } from 'crypto'

export default Vue.extend({
  name: 'WwLogin',

  data() {
    return {
      _checkTimer: null as NodeJS.Timer | null,
      _state: '',
      alreadySigned: false,
      qrcodeUrl: '',
      avatar: '',
      name: '',
      countdown: 3,
      _countdowntimer: null as NodeJS.Timer | null,
    }
  },

  props: {
    state: {
      type: String,
      default: ''
    }
  },

  mounted() {
    this.init()
    this._checkTimer = setInterval(this.checkSignInStatus, 1000)
  },
  beforeDestroy() {
    clearInterval(this._checkTimer!)
    clearInterval(this._countdowntimer!)
  },
  methods: {
    init() {
      if (this.state === '') {
        this._state = randomBytes(16).toString('hex')
      } else {
        this._state = this.state
      }

      QRCode.toDataURL(this.getUrl(), (err, url) => {
        if (err) {
          console.error(err)
          return
        }
        this.qrcodeUrl = url
      })
    },

    getUrl() {
      const uri = new URL('https://open.weixin.qq.com/connect/oauth2/authorize')
      uri.searchParams.append('appid', 'ww66600273ffae5dea')
      uri.searchParams.append(
        'redirect_uri',
        'http://haojiahuo233.com/updateWeChatUserInfo'
      )
      uri.searchParams.append('response_type', 'code')
      uri.searchParams.append('scope', 'snsapi_privateinfo')
      uri.searchParams.append('state', this._state)
      uri.searchParams.append('agentid', '1000002')
      return uri + '#wechat_redirect'
    },

    refresh() {
      this.alreadySigned = false
      this.init()
      clearInterval(this._countdowntimer!)
      this.countdown = 0
      this._checkTimer = setInterval(this.checkSignInStatus, 1000)
    },

    async checkSignInStatus() {
      const isSigned = (await getSignInStatus(this._state)).data
      if (isSigned) {
        clearInterval(this._checkTimer!)
        const userInfo = (await getSignedInUser(this._state)).data
        if (userInfo) {
          this.avatar = userInfo.avatar
          this.name = userInfo.name
          this.alreadySigned = true
          this._countdowntimer = setInterval(() => { this.countdown-- }, 1000)
          setTimeout(this.refresh, 3000)
          this.$emit('signed', userInfo)
        }
      }
    }
  }
})
</script>

<style scoped>
.qrcode {
  width: 240px;
  height: 240px;
  object-fit: fill;
}

.avatar {
  width: 200px;
  height: 200px;
  object-fit: fill;
}
</style>
