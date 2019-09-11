// pages/baoxiu/baoxiu.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kefu:'',
		page:1,
		pagesize:10,
		bx_data:[
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
    this.setData({
      kefu:wx.getStorageSync('kefu')
    })
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
    this.retry()
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
    console.log(wx.getStorageSync('tokenstr'))
    if (!wx.getStorageSync('userInfo')){
      htmlStatus1.dataNull()
      return
    }
    /*0 未接单   （用户刚发布）
    1 进行中  （师傅接单后）
    2 待确认  （师傅提交报价）
    3 已确认   （用户同意此报价）
    4 已完成   （师傅点完成）*/
		wx.request({
			url:  app.IPurl+'',
			data:  {
        apipage: 'smwx',
        "tokenstr": wx.getStorageSync('tokenstr').tokenstr,
          op: 'orderlist_user',
        "pageindex": that.data.page,
        "pagesize": that.data.pagesize,
        "status": 4
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'get',
			success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
				console.log(res.data)
				
				if(res.data.error==0){
					
          if (res.data.list.length==0){  //数据为空
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
            that.data.bx_data = that.data.bx_data.concat(res.data.list)
						that.setData({
              bx_data: that.data.bx_data,
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