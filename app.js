//app.js
App({
  IPurl: 'http://smwx.800123456.top/api.aspx',
  IPurl1:'http://smwx.800123456.top/',
  onLaunch: function () {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('userWxmsg')
    wx.removeStorageSync('tokenstr')
    wx.removeStorageSync('member')
    wx.removeStorageSync('kefu')
    let that=this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('16app'+JSON.stringify(res))
        if (res.authSetting['scope.userInfo']==true) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    			wx.getUserInfo({
    				success(res) {
    					that.globalData.userInfo = res.userInfo
    					console.log(that.globalData.userInfo)
							wx.setStorageSync('userInfo', res.userInfo)
    					if(!that.globalData.userInfo){
    						wx.reLaunch({
    						  url: '/pages/login/login',
    						  fail: (err) => {
    						    console.log("失败: " + JSON.stringify(err));
    						  }
    						})
    					}else{
								that.dologin()
							}
    				}
    			})
    			
        }else{
          // wx.reLaunch({
          //   url: '/pages/login/login',
          //   fail: (err) => {
          //     console.log("失败: " + JSON.stringify(err));
          //   }
    			// })
        }
      }
    })
  },
	dologin(type){
		let that =this
		wx.login({
		  success: function (res) {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
        var uinfo = that.globalData.userInfo
		    let data = {
					key:'server_mima',
					code:res.code,
          apipage:'login',
          nickname: uinfo.nickName,
          headpicurl: uinfo.avatarUrl,
          homeid: 0   //0用户端，1师傅端
		    }
				let rcode=res.code
				console.log(res.code)
				wx.request({
					url:  that.IPurl,
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						console.log(res.data)
						if(res.data.error==0){
              console.log('登录成功')
              wx.setStorageSync('tokenstr', res.data.tokenstr)
              wx.setStorageSync('member', res.data.member)
              wx.setStorageSync('kefu', res.data.fxset)
              // wx.setStorageSync('login', 'login')
              // wx.setStorageSync('morenaddress', res.data.user_member_shopping_address)
              // wx.setStorageSync('appcode', rcode)
							if(type=='shouquan'){
								// wx.reLaunch({
								//   url: '/pages/index/index',
								//   fail: (err) => {
								//     console.log("失败: " + JSON.stringify(err));
								//   }
								// })
                wx.navigateBack()
							}
							
							
							
						}else{
              wx.showToast({
                icon:'none',
                title: '登录失败',
              })
            }
					
					},
					fail() {
						wx.showToast({
							icon:'none',
							title:'登录失败'
						})
					}
				})
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
		// wx.showToast({
		// 	icon:'none',
		// 	title:'调用重试方法'
		// })
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