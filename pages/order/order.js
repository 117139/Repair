// pages/order/order.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		btnkg:0,
		array: ['美国', '中国', '巴西', '日本'],
		index:0,
		array1: ['服务名称1', '服务名称2', '服务名称3', '服务名称4'],
		index1:0,
		imgb:[],
		date:'',
		address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
							url: app.IPurl+'/api/upload_image/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[i],
							name: 'images',
							formData: {
								'module_name': 'used'
							},
							success (res){
								console.log(res.data)
								var ndata=JSON.parse(res.data)
								console.log(ndata)
								console.log(ndata.errcode==0)
								if(ndata.errcode==0){
									that.data.imgb.push(ndata.retData[0])
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
										url:'pages/orderList/orderList'
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