// pages/baoxiu/baoxiu.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		bx_data:[
			{
				cp:'空调维修',
				tel:'03256426',
				id:'374349358435',
				time:'2019/12/3  23:59:59',
			},
			{
				cp:'空调维修',
				tel:'03256426',
				id:'374349358435',
				time:'2019/12/3  23:59:59',
			},
			{
				cp:'空调维修',
				tel:'03256426',
				id:'374349358435',
				time:'2019/12/3  23:59:59',
			},
		]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
		this.getdata()
  },
	retry(){
		app.retry('保修')
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
		console.log('onShow')
		
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
	getdata(){
		const htmlStatus1 = htmlStatus.default(this)
		htmlStatus1.error()    // 切换为error状态
	}
})