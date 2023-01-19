import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Utf8.parse('webflash007cool.') // 密钥: 长度必须为16位
const IV = CryptoJS.enc.Utf8.parse('1234567890123456') // 初始向量: 长度随意
export default {
  // 加密
  encrypt (word) {
    const key = KEY
    const iv = IV
    const srcs = CryptoJS.enc.Utf8.parse(word)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })

    // console.log("-=-=-=-", encrypted.ciphertext)
    console.log(CryptoJS.enc.Base64.stringify(encrypted.ciphertext))
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  },
  // 解密
  decrypt (word) {
    const key = KEY
    const iv = IV
    const base64 = CryptoJS.enc.Base64.parse(word)
    const src = CryptoJS.enc.Base64.stringify(base64)

    const decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })

    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }
}
