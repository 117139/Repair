// pages/order/order.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		btnkg:0,
    fw_data: [{
        pic: '../../static/images/index_07.png',
        name: '管道疏通',
        id: 1
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
    type1: [
      {
        pic: '../../static/images/fuwu_03.jpg',
        name: '房屋电路维修'
      },
      {
        pic: '../../static/images/fuwu_05.jpg',
        name: '灯具维修'
      },
      {
        pic: '../../static/images/fuwu_07.jpg',
        name: '灯具安装'
      },
    ],
		index:0,
		index1:0,
    page:1,
    pagesize:20,
		imgb:[],
		date:'',
		address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id,
        groupid: options.groupid
      })
    }
    this.getType()
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
		let pages = getCurrentPages();
		let currPage = pages[pages.length - 1];
		if (currPage.data.addresschose) {
        this.setData({
            //将携带的参数赋值
            address: currPage.data.addresschose,
            addressBack: true
      });
 
		console.log(this.data.address, '地址')
 
		}
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
	jump(e){
		app.jump(e)
	},
	bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
	bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
	bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  gettype(id) {
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
          var rlist = res.data.list
          if(id){
            for (var i = 0; i < rlist.length; i++) {
              if (id == rlist[i].id) {
                that.setData({
                  index: 0
                })
                break;
              }
            }
          }
          that.setData({
            fw_data: rlist
          })
          that.getgoods(that.data.index,res.data.list[that.data.index].id)
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
  getgoods(index, id) {
    const htmlStatus1 = htmlStatus.default(this)
    var that = this

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

          if (that.data.page) {
            htmlStatus1.dataNull()    // 切换为空数据状态
          } else {
            wx.showToast({
              icon: 'none',
              title: '暂无数据'
            })
          }
        } else if (res.data.list.length > 0) {                           //数据不为空
          var rlist = res.data.list
          if (that.data.groupid!==0) {
            for (var i = 0; i < rlist.length; i++) {
              if (id == rlist[i].id) {
                that.setData({
                  index1: 0
                })
                break;
              }
            }
          }
          that.setData({
            type1: rlist
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
          title: '下单',
        })
      }
    })
  },
	imgdel(e){
		var that =this
		console.log(e.currentTarget.dataset.idx)
		wx.showModal({
			title: '提示',
			content: '确定要删除这张图片吗',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					that.data.imgb.splice(e.currentTarget.dataset.idx,1)
					that.setData({
						imgb:that.data.imgb
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
		
	},
	scpic(){
		var that=this
		wx.chooseImage({
			count: 9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success (res) {
				// tempFilePath可以作为img标签的src属性显示图片
				console.log(res)
				const tempFilePaths = res.tempFilePaths
				const imglen=that.data.imgb.length
				for(var i=0;i<tempFilePaths.length;i++){
					console.log(imglen)
					var newlen=Number(imglen)+Number(i)
					console.log(newlen)
					if(newlen==9){
						wx.showToast({
							icon:'none',
							title:'最多可上传九张'
						})
						break;
					}
					wx.uploadFile({
						url: app.IPurl, //仅为示例，非真实的接口地址
						filePath: tempFilePaths[i],
						name: 'upfile',
						formData: {
							'apipage': 'uppic',
							// "tokenstr": wx.getStorageSync('tokenstr').tokenstr, 
						},
						success (res){
							console.log(res.data)
							var ndata=JSON.parse(res.data)
							console.log(ndata)
							console.log(ndata.error==0)
							if (ndata.error==0){
								that.data.imgb.push(ndata.url)
								that.setData({
									imgb:that.data.imgb
								})
							}else{
								wx.showToast({
									icon:"none",
									title:"上传失败"
								})
							}
						}
					})
					
				}
			}
		})
	},
	formSubmit: function(e) {
		var that =this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
		var fs=e.detail.value
		if(!fs.address){
			wx.showToast({
				icon:'none',
				title:'请选择地址'
			})
			return
		}
		if(!fs.fw){
			wx.showToast({
				icon:'none',
				title:'请选择服务类别'
			})
			return
		}
		if(!fs.wt){
			wx.showToast({
				icon:'none',
				title:'请输入问题描述'
			})
			return
		}
		if(!fs.yytime){
			wx.showToast({
				icon:'none',
				title:'请选择预约时间'
			})
			return
		}
		wx.showModal({
			title: '提示',
			content: '是否要提交该订单',
			success (res) {
				if (res.confirm) {
					console.log('用户点击确定')
					wx.showLoading({
						title:'正在提交。。'
					})
					// 'Authorization':wx.getStorageSync('usermsg').user_token
					// var dztime
					// if(that.data.zhidingcur==-1){
					// 	dztime=0
					// }else{
					// 	dztime=that.data.zhiding[that.data.zhidingcur].id
					// }
					var imbox=that.data.imgb
					imbox=imbox.join(',')
		     
					wx.request({
						url:  app.IPurl+'/api/community/save',
						data:{
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						dataType:'json',
						method:'POST',
						success(res) {
							wx.hideLoading()
							console.log(res.data)
						
							
							if(res.data.errcode==0){
								
								wx.showToast({
									 icon:'none',
									 title:'提交成功',
									 duration:2000
								})
								setTimeout(function(){
									wx.navigateTo({
										url:'/pages/orderList/orderList'
									})
									// wx.switchTab({
									// 	url: "/pages/shequ/shequ"
									// })
								},1000)
								
							}else{
		            if (res.data.ertips){
		              wx.showToast({
		                icon: 'none',
		                title: res.data.ertips
		              })
		            }else{
		              wx.showToast({
		                icon: 'none',
		                title: '操作失败'
		              })
		            }
							}
							
							 
						},
						fail() {
							wx.hideLoading()
							wx.showToast({
								 icon:'none',
								 title:'操作失败'
							})
						}
					})
					
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
  },
})