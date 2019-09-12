// pages/order_xq/order_xq.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqData:'',
    o_no:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加载中...',
    })
    if(options.id){
      this.setData({
        o_no: options.id
      })
      this.getdata(options.id)
    }
  },
  retry() {
    wx.setNavigationBarTitle({
      title: '加载中...'
    })
    this.getdata(this.data.o_no)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getdata(id){
    //op=orderinfo    订单详细
    //out_trade_no
    let that = this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl,
      data: {
        apipage: 'smwx',
        "tokenstr": wx.getStorageSync('tokenstr').tokenstr,
        op: 'orderinfo',
        "out_trade_no":id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        if (res.data.error == 0) {   //成功
          console.log(res.data)
            that.setData({
              xqData: res.data.data,
            })
          // console.log(that.data.xqData)
            htmlStatus1.finish()    // 切换为finish状态


        } else {  //失败
          if (res.data.returnstr) {
            wx.showToast({
              icon: 'none',
              title: res.data.returnstr
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '加载失败'
            })
          }
          htmlStatus1.error()    // 切换为error状态
        }

        // htmlStatus1.error()    // 切换为error状态
      },
      fail(err) {
        wx.showToast({
          icon: "none",
          title: "加载失败"
        })

        console.log(err)
        htmlStatus1.error()    // 切换为error状态
      },
      complete() {
        wx.setNavigationBarTitle({
          title: '订单详情'
        })
      }
    })
  },
  sub(){
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    var that= this
    if(that.data.btnkg==1){
      return
    }else{
      that.data.btnkg == 1
    }
    wx.request({
      url: app.IPurl,
      data: {
        apipage: 'smwx',
        op:'ordercomfirm_user',
        out_trade_no: that.data.xqData.out_trade_no,
        "tokenstr": wx.getStorageSync('tokenstr').tokenstr
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'POST',
      success(res) {
        wx.hideLoading()
        console.log(res.data)


        if (res.data.error == 0) {

          wx.showToast({
            icon: 'none',
            title: '确认成功',
            duration: 2000
          })
          setTimeout(function () {
            that.getdata(that.data.xqData.out_trade_no)

          }, 1000)

        } else {
          if (res.data.returnstr) {
            wx.showToast({
              icon: 'none',
              title: res.data.returnstr
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '操作失败'
            })
          }
        }


      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '操作失败'
        })
      }
    })
  },
  jump(e){
    app.jump(e)
  },
  call(e) {
    console.log(e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  pveimg(e) {
    var curr = e.currentTarget.dataset.src
    var urls = e.currentTarget.dataset.array
    app.pveimg(curr, urls)
  }
})