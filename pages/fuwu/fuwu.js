// page/DEST/DEST.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		fw_data: [{
				pic: '../../static/images/index_07.png',
				name: '管道疏通',
        id:1
			},
			{
				pic: '../../static/images/index_09.png',
        name: '家电维修',
        id: 1
			},
			{
				pic: '../../static/images/index_11.png',
        name: '灯具电路',
        id: 1
			},
			{
				pic: '../../static/images/index_13.png',
        name: '卫浴洁具',
        id: 1
			},
			{
				pic: '../../static/images/index_19.png',
        name: '门窗维修',
        id: 1
			},
			{
				pic: '../../static/images/index_20.png',
        name: '门锁开换',
        id: 1
			},
			{
				pic: '../../static/images/index_21.png',
        name: '家具安装',
        id: 1
			},
			{
				pic: '../../static/images/index_22.png',
        name: '家电清洗',
        id: 1
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
		dest_type:-1,
    page:1,
    pagesize:20,
    keyword:''
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
    this.gettype()
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
    var that =this
    if(that.data.dest_type==-1){
      that.sousuo()
    }else{
      that.getgoods(that.data.dest_type, that.data.fw_data[that.data.dest_type].id)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    /*apipage=shop
      op=indexlist
      pageindex
      pagesize
      keyword  (搜索时用) */
      
    var keyword = e.detail.value.keyword
    
    var that = this
    that.setData({
      dest_type:-1,
      page:1,
      type1:[],
      keyword: keyword
    })
    wx.setNavigationBarTitle({
      title: '加载中...',
    })
    that.sousuo()
  },
  sousuo(){
    var that =this
    const htmlStatus1 = htmlStatus.default(that)
    wx.request({
      url: app.IPurl,
      data: {
        "apipage": "shop",
        "op": "indexlist",
        "pageindex": that.data.page,
        "pagesize": that.data.pagesize,
        keyword: that.data.keyword
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.list2.length == 0) {  //数据为空

          if (that.data.page==1) {
            htmlStatus1.dataNull()    // 切换为空数据状态
          } else {
            wx.showToast({
              icon: 'none',
              title: '已经到底了'
            })
          }
          

        } else if (res.data.list2.length > 0) {                           //数据不为空
          that.data.page++
          that.data.type1 = that.data.type1.concat(res.data.list2)
          that.setData({
            type1: that.data.type1,
            page: that.data.page
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
          title: '服务',
        })
      }
    })
  },
  bindconfirm(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var keyword = e.detail.value.keyword

    var that = this
    that.setData({
      dest_type: -1,
      page: 1,
      type1: [],
      keyword: keyword
    })
    that.sousuo()
  },
	jump(e){
		app.jump(e)
  },
  gettype() {
    var that=this
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
        } else if (res.data.list.length> 0){                           //数据不为空
          that.setData({
            fw_data: res.data.list
          })
          that.getgoods(that.data.dest_type, res.data.list[that.data.dest_type].id)
          htmlStatus1.finish()    // 切换为finish状态
        }else{
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
          title: '服务',
        })
      }
    })
  },
  qhType(e){
    // console.log(e.currentTarget.dataset.idx)
    var that =this
    var idx = e.currentTarget.dataset.idx
    // console.log(that.data.dest_type)
    if (idx == that.data.dest_type){
      // console.log(1)
      return
    }else{
      // console.log(2)
      that.setData({
        dest_type: idx,
        page:1,
        type1:[]
      })
      that.getgoods(idx, that.data.fw_data[idx].id)
    }
  },
  getgoods(index, id) {
    const htmlStatus1 = htmlStatus.default(this)
    var that= this
    wx.setNavigationBarTitle({
      title: '加载中...',
    })
    wx.request({
      url: app.IPurl,
      data: {
        "apipage": "shop",
        "op": "groupshoplist",
        "groupid": id,
        "type": '',
        "pageindex": that.data.page,
        "pagesize": that.data.pagesize
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      method: 'get',
      success(res) {
        console.log(res.data)
        if (res.data.list.length == 0) {  //数据为空

          if(that.data.page==1){
            htmlStatus1.dataNull()    // 切换为空数据状态
          }else{
            wx.showToast({
              icon: 'none',
              title: '已经到底了'
            })
          }

          // wx.showToast({
          //   icon: 'none',
          //   title: 'z'
          // })


        } else if (res.data.list.length>0) {                           //数据不为空
          that.data.page++
          that.data.type1 = that.data.type1.concat(res.data.list)
          that.setData({
            type1: that.data.type1,
            page:that.data.page
          })
          htmlStatus1.finish()    // 切换为finish状态
        }else {
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
          title: '服务',
        })
      }
    })
  }
})