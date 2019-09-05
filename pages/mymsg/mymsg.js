// pages/mymsg/mymsg.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
		sex:[
			'男',
			'女',
		],
		region: [],
		index:0,
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
	bindPickerChange: function(e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
	  this.setData({
	    index: e.detail.value
	  })
	},
	//选择地区
	bindRegionChange(e) {
	  console.log('picker发送选择改变，携带值为', e.detail.value)
		this.data.region=e.detail.value
	  this.setData({
	    region: this.data.region
	  })
	},
	formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
		var fs=e.detail.value
		if(fs.tel==""){
			wx.showToast({
				icon:'none',
				title:'请输入手机号'
			})
			return
		}
		
		if(fs.address=="  "){
			wx.showToast({
				icon:'none',
				title:'请选择居住地'
			})
			return
		}
		if(fs.xxaddress==""){
			wx.showToast({
				icon:'none',
				title:'请输入详情地址'
			})
			return
		}
		
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
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
						wx.navigateBack()
					},1000)
					
				}else{
					that.setData({
						btnkg:0
					})
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
				that.setData({
					btnkg:0
				})
				wx.hideLoading()
				wx.showToast({
					 icon:'none',
					 title:'操作失败'
				})
			}
		})
  },
})