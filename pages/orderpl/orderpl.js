// pages/orderpl/orderpl.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		content:'',
		fw:0,
		zy:0,
		plf:[1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
		this.setData({
			content:e.detail.value
		})
  },
	pl(e){
		var that =this
		console.log(e)
		var type=e.currentTarget.dataset.type
		var fs=e.currentTarget.dataset.fs
		if(type==1){
			that.setData({
				fw:e.currentTarget.dataset.fs
			})
		}else{
			that.setData({
				zy:e.currentTarget.dataset.fs
			})
		}
	},
	sub(){
		var that =this
		console.log(that.data.content)
		console.log(that.data.fw)
		console.log(that.data.zy)
		if(that.data.content==''){
			wx.showToast({
				icon:'none',
				title:'请输入评论'
			})
			return
		}
		if(that.data.fw==0||that.data.zy==0){
			wx.showToast({
				icon:'none',
				title:'请给师傅打分'
			})
			return
		}
		wx.request({
			url:  app.IPurl+'/api/coupon/1',
			data:{
				token:wx.getStorageSync('token')
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'post',
			success(res) {
				console.log(res.data)
				if(res.data.code==1){
						
				}else{
					wx.showToast({
						icon:'none',
						title:'操作失败'
					})
				}
				
			},
			fail() {
				wx.showToast({
					icon:'none',
					title:'操作失败'
				})
				 console.log('失败')
			}
		})
	}
	
})