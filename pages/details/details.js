// pages/details/details.js
var htmlStatus = require('../../utils/htmlStatus/index.js')

var WxParse = require('../../vendor/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    xqData:{},
		bannerimg: [],
    kefu:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      wx.setNavigationBarTitle({
        title: '加载中'
      })
      this.setData({
        goods_id:options.id
      })
      this.getDetails(options.id)
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
  getDetails(id) {
    var that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl,
      data: {
        "apipage": "shop",
        "op": "shopinfo",
        "id": id 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
       if (res.data.error==0) {                           //数据不为空
         var picarr = res.data.model.pics
          var arr = picarr.split(",");
          var arr1 = []
          for (var i in arr) {
           var arr2 = []
           arr2 = arr[i].split("|");
           // console.log(imgurl+arr2[1])
           if (arr2[1] && arr2[1] != '') {
             arr1.push(app.IPurl1 + arr2[1])
           }

          }
          that.setData({
            xqData: res.data.model,
            kefu: res.data.fxset,
            bannerimg: arr1
          })
         var article = res.data.model.description
          var subStr = new RegExp('<div>&nbsp;</div>', 'ig');
          article = article.replace(subStr, "<text style='margin-bottom:1em;'></text>");
          WxParse.wxParse('article', 'html', article, that, 5);
          wx.setNavigationBarTitle({
            title: res.data.model.name,
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
        // wx.setNavigationBarTitle({
        //   title: '详情页',
        // })
      }
    })
  },
	yyfuc(){
    var xqData = this.data.xqData
		wx.navigateTo({
      url: '/pages/order1/order?id=' + xqData.id + '&groupid=' + xqData.groupid
		})
	},
  call(){
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.kefu.str1
    })
  }
})