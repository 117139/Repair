//index.js
//获取应用实例
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({
	data: {
		bannerimg: [],
		fw_data: [],
    currentIndex:'',
    page:1,
		hot_data: [],
		cai_data:[
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
    this.getbanner()
    this.gettype()
	},
  retry() {
    wx.setNavigationBarTitle({
      title: '加载中...',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    // wx.showToast({
    //   icon: 'none',
    //   title: '调用重试方法'
    // })
    if (getCurrentPages().length != 0) {
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
      getCurrentPages()[getCurrentPages().length - 1].onShow()
    }
    wx.setNavigationBarTitle({
      title: '首页',
    })
  },
  onPullDownRefresh: function () {
    console.log('下拉')

    this.retry()
  },
	jump(e){
		app.jump(e)
	},
  handleChange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      currentIndex: e.detail.current
    })
    if (e.detail.current == that.data.tuijian.length - 1) {
      // console.log('ajax')
      that.getHot()
    }
  },
  getbanner(){
    /* "apipage": "imagelist",
          "type": 1 */
    var that =this
    wx.request({
      url: app.IPurl,
      data: {
        apipage: "imagelist",
        type: 1
        // tokenstr:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.datalist.length == 0) {  //数据为空
          htmlStatus1.dataNull()    // 切换为空数据状态
          wx.showToast({
            icon: 'none',
            title: '暂无banner'
          })
        } else if (res.data.datalist.length > 0) {                           //数据不为空
          that.data.bannerimg=[]
          for (var i = 0; i < res.data.datalist.length; i++) {
            that.data.bannerimg.push(res.data.datalist[i].Image1)
          }
          that.setData({
            bannerimg: that.data.bannerimg
          })
         
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
          
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
        
      },
      complete() {
      }
    })
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
        // 停止下拉动作
        wx.stopPullDownRefresh();
        console.log(res.data)
        if (res.data.list.length == 0) {  //数据为空
          htmlStatus1.dataNull()    // 切换为空数据状态
          wx.showToast({
            icon: 'none',
            title: '暂无分类'
          })
        } else if (res.data.list.length > 0) {                           //数据不为空
          that.getHot()
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
          title: '首页',
        })
      }
    })
  },
  getHot(){
    /*apipage=shop
    op = indexlist
    pageindex
    pagesize*/
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl,
      data: {
        apipage: "shop",
        op: "indexlist",
        pageindex: that.data.page,
        pagesize:10,
        // tokenstr:wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        that.setData({
          cai_data:res.data.list3
        })
        if (res.data.list1.length == 0) {  //数据为空
          htmlStatus1.dataNull()    // 切换为空数据状态
          wx.showToast({
            icon: 'none',
            title: '暂无热门服务'
          })
        } else if (res.data.list1.length > 0) {                           //数据不为空
          that.data.hot_data = that.data.hot_data.concat(res.data.list1)
          that.setData({
            hot_data: that.data.hot_data
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '加载失败'
          })
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '加载失败'
        })
      },
      complete() {
        
      }
    })
  }
})
