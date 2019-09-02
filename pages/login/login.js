const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    var that = this;
    // 查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.redirectTo({
    //         url: '/pages/index/index'
    //       })
    //       wx.getUserInfo({
    //         success: function(res) {
    //           //用户已经授权过
              
    //         }
    //       });
    //     }
    //   }
    // })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮后需要处理的逻辑方法体
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
			wx.setStorageSync('userWxmsg', e.detail.userInfo)
      app.dologin('shouquan')
      /*wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: app.IPurl1+'',
              data: {
                code: res.code,
                nickName: e.detail.userInfo.nickName,
                city: e.detail.userInfo.city,
                province: e.detail.userInfo.province,
                avatarUrl: e.detail.userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                var userinfo = {};
                userinfo['id'] = res.data.id;
                userinfo['nickName'] = info.detail.userInfo.nickName;
                userinfo['avatarUrl'] = info.detail.userInfo.avatarUrl;
                wx.setStorageSync('userinfo', userinfo)
              }
            })
          } else {
            console.log("授权失败");
          }
        },
      })*/
			// wx.reLaunch({
			// 	url: '/pages/index/index',
			// 	fail(err) {
			// 		console.log("失败: " + JSON.stringify(err));
			// 	}
			// })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
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

})

