const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    var that = this;
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮后需要处理的逻辑方法体
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo)
			wx.setStorageSync('userWxmsg', e.detail.userInfo)
      app.dologin('shouquan')
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法登录小程序，请点击返回授权!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  goback(){
    wx.navigateBack()
  }
})

