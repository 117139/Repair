//index.js
//获取应用实例
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({
	data: {
		bannerimg: [{
				pic: '/static/images/index_03.png'
			},
			{
				pic: '/static/images/index_03.png'
			},
			{
				pic: '/static/images/index_03.png'
			},
		],
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

		hot_data: [{
				pic: '../../static/images/index_28.jpg',
				name: '水龙头维修'
			},
			{
				pic: '../../static/images/index_31.jpg',
				name: '空调维修'
			},
			{
				pic: '../../static/images/index_33.jpg',
				name: '家电维修'
			},
			{
				pic: '../../static/images/index_28.jpg',
				name: '水龙头维修'
			},
			{
				pic: '../../static/images/index_31.jpg',
				name: '空调维修'
			},
			{
				pic: '../../static/images/index_33.jpg',
				name: '家电维修'
			},
		],
		cai_data:[
			{
					pic: '../../static/images/index_42.jpg',
					name: '水龙头维修'
				},
				{
					pic: '../../static/images/index_43.jpg',
					name: '空调维修'
				},
				{
					pic: '../../static/images/index_47.jpg',
					name: '家电维修'
				},
				{
					pic: '../../static/images/index_48.jpg',
					name: '家电维修'
				},
		],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		circular: true
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function() {
    this.gettype()
	},
  retry() {
    wx.setNavigationBarTitle({
      title: '加载中...',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.showToast({
      icon: 'none',
      title: '调用重试方法'
    })
    if (getCurrentPages().length != 0) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
      getCurrentPages()[getCurrentPages().length - 1].onShow()
    }
    wx.setNavigationBarTitle({
      title: '保修',
    })
  },
	jump(e){
		app.jump(e)
	},
  gettype() {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl,
      data: {
        apipage: "shop",
        op: "grouplist",
        // tokenstr:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.list.length == 0) {  //数据为空
          htmlStatus1.dataNull()    // 切换为空数据状态
          wx.showToast({
            icon: 'none',
            title: '暂无分类'
          })
        } else if (res.data.list.length > 0) {                           //数据不为空
          that.setData({
            fw_data: res.data.list
          })
          htmlStatus1.finish()    // 切换为finish状态
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
          htmlStatus1.error()    // 切换为error状态
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        wx.setNavigationBarTitle({
          title: '上门服务',
        })
      }
    })
  },
})
