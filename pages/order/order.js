// pages/order/order.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		btnkg:0,
    fw_data: [],
    type1: [],
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
    var that =this
    that.gettype1()
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
    var that = this
    that.gettype1()
    // 停止下拉动作
    wx.stopPullDownRefresh();
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
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      app.jump(e)
    }
		
	},
	bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var idx=e.detail.value
    this.setData({
      index: idx,
      type1:[]
    })
    this.getgoods(idx, this.data.fw_data[idx].id)
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

  gettype1() {
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
          that.setData({
            fw_data: rlist
          })
          // that.getgoods(that.data.index,res.data.list[that.data.index].id)
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
  scpic() {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        
        const imglen = that.data.imgb.length
        that.upimg(tempFilePaths, 0)
       
      }
    })
  },
  upimg(imgs, i) {
    var that = this
    const imglen = that.data.imgb.length
    var newlen = Number(imglen) + Number(i)
    if (imglen == 9) {
      wx.showToast({
        icon: 'none',
        title: '最多可上传九张'
      })
      return
    }
    // console.log(img1)
    wx.uploadFile({
      url: app.IPurl, //仅为示例，非真实的接口地址
      filePath: imgs[i],
      name: 'upfile',
      formData: {
        'apipage': 'uppic',
      },
      success(res) {
        // console.log(res.data)
        var ndata = JSON.parse(res.data)
        if (ndata.error == 0) {
          console.log(imgs[i], i, ndata.url)
          var newdata = that.data.imgb
          console.log(i)
          newdata.push(ndata.url)
          that.setData({
            imgb: newdata
          })
          // i++
          // that.upimg(imgs, i)
          var news1 = that.data.imgb.length
          if (news1 < 9) {
            i++
            that.upimg(imgs, i)
          }
        } else {
          wx.showToast({
            icon: "none",
            title: "上传失败"
          })
        }
      }
    })
  },
	formSubmit: function(e) {
		var that =this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (!wx.getStorageSync('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    if (!wx.getStorageSync('member').Phone) {
      wx.showModal({
        title: '提示',
        content: '请先绑定用户信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: "/pages/mymsg/mymsg"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
		var fs=e.detail.value
		if(!fs.address){
			wx.showToast({
				icon:'none',
				title:'请选择地址'
			})
			return
    }
    if (!fs.fw_type) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务类别'
      })
      return
    }
    if (!fs.fw_name) {
      wx.showToast({
        icon: 'none',
        title: '请选择服务名称'
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
				
					var imbox=that.data.imgb
					imbox=imbox.join(',')
		     
					wx.request({
						url:  app.IPurl+'/api/community/save',
						data:{
              apipage:'smwx',
              op:'orderpub_user',  //用户下单
              shopid: '',//(按需传递)
              name: fs.fw_name,
              description: fs.wt,
              addressid: that.data.address.ID,//(地址id)
              pics: imbox,//(描述图片)
              yuyuetime: fs.yytime,  //（预约时间，标准时间格式2019-9 - 9）
              shopgroupid: that.data.fw_data[that.data.index].id,  //（分类id）
              "tokenstr": wx.getStorageSync('tokenstr').tokenstr
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						dataType:'json',
						method:'POST',
						success(res) {
							wx.hideLoading()
							console.log(res.data)
						
							
							if(res.data.error==0){
								
								wx.showToast({
									 icon:'none',
									 title:'提交成功',
									 duration:2000
								})
								setTimeout(function(){
									wx.navigateTo({
										url:'/pages/orderList/orderList'
									})
								
								},1000)
								
							}else{
                if (res.data.returnstr){
		              wx.showToast({
		                icon: 'none',
                    title: res.data.returnstr
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