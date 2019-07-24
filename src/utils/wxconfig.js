/**
 * 微信配置
 */
import wx from 'weixin-js-sdk'
const timestamp = new Date().getTime()
const appType = ''
const appId = ''
const noncestr = ''
const signature = ''
// 获取微信配置
wx.config({
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: appId, // 必填，公众号的唯一标识
  timestamp: timestamp, // 必填，生成签名的时间戳
  nonceStr: noncestr, // 必填，生成签名的随机串
  signature: signature, // 必填，签名
  jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'hideMenuItems'
  ] // 必填，需要使用的JS接口列表
})

wx.error(function(res) {

})
wx.ready(function() {

})

