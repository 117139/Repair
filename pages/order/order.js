// pages/order/order.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		array: ['美国', '中国', '巴西', '日本'],
		index:0,
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
	
})