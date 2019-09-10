// pages/my/my.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    'member': wx.getStorageSync('member'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		// var usermsg=wx.getStorageSync('userInfo')
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
		// if(!usermsg){
		// 	// 获取用户信息
		// 	wx.getSetting({
		// 	  success: res => {
		// 	    console.log('16app'+JSON.stringify(res))
		// 	    if (res.authSetting['scope.userInfo']==true) {
		// 	      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		// 				wx.getUserInfo({
		// 					success(res) {
		// 						app.globalData.userInfo = res.userInfo
		// 						console.log(app.globalData.userInfo)
		// 						wx.setStorageSync('userInfo', res.userInfo)
		// 						if(!app.globalData.userInfo){
		// 							wx.reLaunch({
		// 							  url: '/pages/login/login',
		// 							  fail: (err) => {
		// 							    console.log("失败: " + JSON.stringify(err));
		// 							  }
		// 							})
		// 						}else{
		// 							app.dologin()
		// 						}
		// 					}
		// 				})
						
		// 	    }else{
		// 	      wx.reLaunch({
		// 	        url: '/pages/login/login',
		// 	        fail: (err) => {
		// 	          console.log("失败: " + JSON.stringify(err));
		// 	        }
		// 				})
		// 	    }
		// 	  }
		// 	})
			
		// }else{
		// 	this.setData({
		// 		userInfo:usermsg
		// 	})
		// }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
	jump(e){
    if (!wx.getStorageSync('userInfo')){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.jump(e)
    }
	}
})