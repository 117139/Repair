//logs.js
const app = getApp()

Page({
  data: {
		btnkg:0,
    region: [],
		moren:true
  },
  onLoad: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
	morenfuc(){
		this.setData({
		  moren: !this.data.moren
		})
	},
	//选择地区
	bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
	//设置默认
	switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
		this.setData({
			moren:e.detail.value
		})
  },
	//提交表单
	formSubmit(e) {
		let that =this
		
		console.log('form发生了submit事件，携带数据为：', e.detail.value)
		let formresult=e.detail.value
		if (formresult.name=='') {
			wx.showToast({
				title: '收货人姓名不能为空',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (!(/^1\d{10}$/.test(formresult.tel))) {
			wx.showToast({
				title: '手机号码有误',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (formresult.address=='') {
			wx.showToast({
				title: '请选择地区',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if (formresult.xxaddress=='') {
			wx.showToast({
				title: '请填写详情地址',
				duration: 2000,
				icon:'none'
			});
			return false;
		}
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
	//http://water5100.800123456.top/WebService.asmx/useraddress
		wx.request({
			url:  app.IPurl,
			data:  {
				'apipage': 'address', 
          'contact_province_code': that.data.region[2], 
          'contact_city_code': that.data.region[1], 
          'contact_area_code': that.data.region[0], 
          'details_info': formresult.xxaddress, 
          'consignee': formresult.name, 
          'consignee_tel': formresult.tel, 
          'op': 'edit', 
					"tokenstr": wx.getStorageSync('tokenstr').tokenstr
		    },
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'POST',
			success(res) {
				console.log(res.data)
				
				if(res.data.error==0){
					wx.showToast({
						title:'保存成功'
					})
					setTimeout(function(){
						that.setData({
							btnkg:0
						})
						wx.navigateBack()
					},1000)
				}else{
					that.setData({
						btnkg:0
					})
					if(res.data.msg){
						wx.showToast({
							icon:'none',
							title:res.data.msg
						})
					}else{
						wx.showToast({
							icon:'none',
							title:'操作失败'
						})
					}
				}
			},
			fail(err){
				that.setData({
					btnkg:0
				})
				wx.showToast({
					icon:'none',
					title:'操作失败'
				})
				console.log(err)
			}
		})
  },
})
