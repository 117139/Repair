// pages/baoxiu/baoxiu.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		page:1,
		pagesize:10,
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
		wx.setNavigationBarTitle({
			title:'加载中...'
		})
		this.getdata()
  },
	retry(){
		wx.setNavigationBarTitle({
			title:'加载中...'
		})
		this.getdata()
		// app.retry('保修')
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
		this.getdata()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
	getdata(){
		const htmlStatus1 = htmlStatus.default(this)
		// htmlStatus1.error()    // 切换为error状态
		let that =this
		wx.request({
			url:  app.IPurl+'',
			data:  {
				page:that.data.page,
				pagesize:that.data.pagesize,
				token:wx.getStorageSync('token')
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'get',
			success(res) {
				console.log(res.data)
				
				if(res.data.code==1){
					
					if(res.data.data.length==0){  //数据为空
						if(that.data.page==1){      //第一次加载
							htmlStatus1.dataNull()    // 切换为空数据状态
						}else{
							wx.showToast({
								icon:'none',
								title:'暂无更多数据'
							})
						}
						
					}else{                           //数据不为空
						that.data.page++
						that.setData({
							addresslist:res.data.data,
							page:that.data.page
						})
							htmlStatus1.finish()    // 切换为finish状态
					}
				}else{
					if(res.data.msg){
						wx.showToast({
							icon:'none',
							title:res.data.msg
						})
					}else{
						wx.showToast({
							icon:'none',
							title:'加载失败'
						})
					}
					htmlStatus1.error()    // 切换为error状态
				}
				
					// pageState1.error()    // 切换为error状态
			},
			fail() {
				wx.showToast({
					icon:'none',
					title:'加载失败'
				})
				 htmlStatus1.error()    // 切换为error状态
			},
			complete() {
				wx.setNavigationBarTitle({
				  title: '保修',
				})
			}
		})
	}
})