// page/DEST/DEST.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		fw_data: [{
				pic: '../../static/images/index_07.png',
				name: '管道疏通'
			},
			{
				pic: '../../static/images/index_09.png',
				name: '家电维修'
			},
			{
				pic: '../../static/images/index_11.png',
				name: '灯具电路'
			},
			{
				pic: '../../static/images/index_13.png',
				name: '卫浴洁具'
			},
			{
				pic: '../../static/images/index_19.png',
				name: '门窗维修'
			},
			{
				pic: '../../static/images/index_20.png',
				name: '门锁开换'
			},
			{
				pic: '../../static/images/index_21.png',
				name: '家具安装'
			},
			{
				pic: '../../static/images/index_22.png',
				name: '家电清洗'
			},
		],
		dest:[
		 {
			 pic:'../../static/images/images/dest_03.jpg',
			 name:'英国'
		 },
		 {
			 pic:'../../static/images/images/dest_05.jpg',
			 name:'法国'
		 },
		 {
			 pic:'../../static/images/images/dest_10.jpg',
			 name:'瑞士'
		 },
		 {
			 pic:'../../static/images/images/dest_11.png',
			 name:'德国'
		 },
		],
		type1:[
			{
				pic:'../../static/images/fuwu_03.jpg',
				name:'房屋电路维修'
			},
			{
				pic:'../../static/images/fuwu_05.jpg',
				name:'灯具维修'
			},
			{
				pic:'../../static/images/fuwu_07.jpg',
				name:'灯具安装'
			},
		],
		dest_type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		if(options.type){
			console.log("type: " + options.type);
			this.setData({
				dest_type:options.type
			})
		}
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
	dest_fuc(e){
		var that =this
		if(e.currentTarget.dataset.idx==that.data.dest_type){
			return
		}
		that.setData({
			dest_type:e.currentTarget.dataset.idx
		})
	},
	jump(e){
		app.jump(e)
	}
})