//logs.js
const app = getApp()

Page({
  data: {
		btnkg:0,   //0ok  1off
    region: [],
		moren:false,
		editaddress:{}
  },
  onLoad: function (option) {
    if(option.address){
			console.log(option.address)
			this.setData({
				editaddress:JSON.parse(option.address)
			})
      this.data.region[0] = this.data.editaddress.Province
      this.data.region[1] = this.data.editaddress.City
      this.data.region[2] = this.data.editaddress.County
      this.setData({
        region: this.data.region
      })
			// this.setData({
			// 	region:this.data.region,
			// 	moren:this.data.editaddress.is_default
			// })
			console.log(this.data.region)
		}
		
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
	//选择地区
	bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
		this.data.region=e.detail.value
    this.setData({
      region: this.data.region
    })
  },
	//设置默认
	switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
		this.setData({
			moren:e.detail.value==true?1:0
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
		var areaz=that.data.region[0]+' '+that.data.region[1]+' '+that.data.region[2]
		if(that.data.region[1]==undefined||that.data.region[2]==undefined){
			areaz=that.data.region[0]
		}
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		wx.request({
			url: app.IPurl,
			data:  {
        'id': that.data.editaddress.ID,
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
			method:'get',
			success(res) {
				console.log(res.data)
				if(res.data.error==0){
					wx.showToast({
						title:'操作成功'
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
  }
	
})
