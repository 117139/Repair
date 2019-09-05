//app.js
App({
	IPurl:'',
  onLaunch: function () {
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
								// that.dologin()
							}
    				}
    			})
    			
        }else{
          wx.reLaunch({
            url: '/pages/login/login',
            fail: (err) => {
              console.log("失败: " + JSON.stringify(err));
            }
    			})
        }
      }
    })
  },
	dologin(type){
		let that =this
		wx.login({
		  success: function (res) {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
		    let data = {
					key:'server_mima',
					code:res.code
		    }
				let rcode=res.code
				console.log(res.code)
				wx.request({
					url:  that.IPurl1+'login',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'POST',
					success(res) {
						console.log(res.data)
						if(res.data.error==0){
							// var login = wx.getStorageSync('login')
							// wx.reLaunch({
							//   url: '/pages/index/index',
							//   fail: (err) => {
							//     console.log("失败: " + JSON.stringify(err));
							//   }
							// })
							if(type=='shouquan'){
								wx.reLaunch({
								  url: '/pages/index/index',
								  fail: (err) => {
								    console.log("失败: " + JSON.stringify(err));
								  }
								})
							}
							console.log('登录成功')
	            wx.setStorageSync('login', 'login')
							wx.setStorageSync('tokenstr', res.data.tokenstr)
							wx.setStorageSync('morenaddress', res.data.user_member_shopping_address)
							/*
								address:"2321231323"
								city:"北京市"
								county:"东城区"
								create_time:"05/14/2019 15:50:41"
								default_add:1
								mobile:"18334774129"
								name:"苏鑫"
								province:"北京市"
								update_time:"05/14/2019 15:50:41"
								user_member_id:2
								user_member_shopping_address_id:3
							*/
							wx.setStorageSync('appcode', rcode)
						}
						if(res.data.error==2){
							wx.setStorageSync('tokenstr', res.data.tokenstr)
							wx.setStorageSync('appcode', rcode)
							// wx.reLaunch({
							// 	url:'/pages/login/login'
							// })
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