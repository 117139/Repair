// pages/mymsg/mymsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		sex:[
			'男',
			'女',
		],
		region: [],
		index:0,
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
	bindPickerChange: function(e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
	  this.setData({
	    index: e.detail.value
	  })
	},
	//选择地区
	bindRegionChange(e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
		this.data.region=e.detail.value
	  this.setData({
	    region: this.data.region
	  })
	},
	formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})