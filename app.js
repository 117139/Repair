//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
	jump(e){
		console.log(e)
		wx.navigateTo({
			url:e.currentTarget.dataset.url
		})
	},
	retry(tit){
		wx.setNavigationBarTitle({
		  title: '加载中...',
		  success: function(res) {},
		  fail: function(res) {},
		  complete: function(res) {},
		})
		wx.showToast({
			icon:'none',
			title:'调用重试方法'
		})
		if (getCurrentPages().length != 0) {
		  getCurrentPages()[getCurrentPages().length - 1].onLoad()
		  getCurrentPages()[getCurrentPages().length - 1].onShow()
		}
		setTimeout(function(){
			wx.setNavigationBarTitle({
			  title: tit,
			})
		},1000)
	},
  globalData: {
    userInfo: null
  }
})