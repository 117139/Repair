//myaddress.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({
  data: {
		btnkg:0,
		addresslist:[],
    mridx:0
  },
  onLoad: function (option) {
		var that =this
		wx.setNavigationBarTitle({
			title:'加载中...'
		})
		if(option.type==1){
			that.setData({
				btnkg:0,
				addresback:true
			})
		}else{
			that.setData({
				addresback:false
			})
		}
  },
	onShow(){

		this.getaddlist()
	},
	
	retry(){
    this.setData({
      btnkg:0
    })
		wx.setNavigationBarTitle({
			title:'加载中...'
		})
		this.getaddlist()
		// app.retry('保修')
	},
   /* 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.retry()
  },
	toback(e){
		var that =this
		if(that.data.addresback==true){
			if(that.data.btnkg==1){
				return
			}else{
				that.setData({
					btnkg:1
				})
			}
			console.log(e.currentTarget.dataset.idx)
			var idx= e.currentTarget.dataset.idx
			var pages = getCurrentPages();   //当前页面
			var prevPage = pages[pages.length - 2];   //上一页面
			prevPage.setData({
			       //直接给上一个页面赋值
			      addresschose: that.data.addresslist[idx],
			});
			 
			wx.navigateBack({
			     //返回
			     delta: 1
			})
		}
	},
	jump(e){
		app.jump(e)
	},
	selecmr(e){
		let that =this
		console.log(e.currentTarget.dataset.id)
		let id=e.currentTarget.dataset.id
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		wx.request({
			url:  app.IPurl,
			data:  {
        'op': 'moren',
        'id': id,
        'apipage': 'address', 
        "tokenstr": wx.getStorageSync('tokenstr').tokenstr
		  },
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
      method:'get',
			success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
				console.log(res.data)
				that.setData({
					btnkg:0
				})
				if(res.data.error==0){
					that.getaddlist()
				}else{
          if (res.data.returnstr){
						wx.showToast({
              title: res.data.returnstr,
							duration: 2000,
							icon:'none'
						});
					}else{
						wx.showToast({
							title: '操作失败',
							duration: 2000,
							icon:'none'
						});
					}
				}
			},
			fail(err){
				console.log(err)
				wx.showToast({
          title: '操作失败',
					duration: 2000,
					icon:'none'
				});
				that.setData({
					btnkg:0
				})
			}
		})
	},
	addressEdit(e){
		
		console.log(e.currentTarget.dataset.id)
		let address=this.data.addresslist[e.currentTarget.dataset.id]
		 address=JSON.stringify(address)
		wx.navigateTo({
			url:'/pages/addressEdit/addressEdit?address='+address
		})
	},
	addressDel(e){
		let that =this
		console.log(e.currentTarget.dataset.id)
		let id=e.currentTarget.dataset.id
		wx.showModal({
			content:"确定要删除改地址吗?",
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定')
					if(that.data.btnkg==1){
						return
					}else{
						that.setData({
							btnkg:1
						})
					}
					wx.request({
						url:  app.IPurl,
						data:  {
              'op': 'del', 
                'id': id,
              'apipage': 'address',
              "tokenstr": wx.getStorageSync('tokenstr').tokenstr
					    },
						header: {
							'content-type': 'application/x-www-form-urlencoded' 
						},
						dataType:'json',
						method:'get',
						success(res) {
							console.log(res.data)
							that.setData({
								btnkg:0
							})
							if(res.data.error==0){
								wx.showToast({
									title:'操作成功'
								})
                  that.getaddlist()

							}else{
                if (res.data.returnstr){
									wx.showToast({
                    title: res.data.returnstr,
										duration: 2000,
										icon:'none'
									});
								}else{
									wx.showToast({
										title: '网络异常',
										duration: 2000,
										icon:'none'
									});
								}
							}
						},
						fail(){
							that.setData({
								btnkg:0
							})
							wx.showToast({
								title: '网络异常',
								duration: 2000,
								icon:'none'
							});
						}
					})
					
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	getaddlist(){
		const htmlStatus1 = htmlStatus.default(this)
		let that =this
		// return
		//http://water5100.800123456.top/WebService.asmx/useraddress
		wx.request({
			url:  app.IPurl+'/api/userAddressList',
			data:  {
          "op":'list',
					'apipage': 'address',
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
          that.data.addresslist= res.data.list
					that.setData({
						addresslist:res.data.list
					})
					
          htmlStatus1.finish()    // 切换为finish状态

				}else{
					wx.showToast({
						icon:'none',
						title:'加载失败'
					})
					 htmlStatus1.error()    // 切换为error状态
				}
				
			},
			fail() {
				wx.showToast({
					icon:'none',
					title:'加载失败'
				})
				 htmlStatus1.error()    // 切换为error状态
			},
			complete() {
				wx.setNavigationBarTitle({
					title:'我的地址'
				})
			}
		})
	},
	onRetry(){
		this.getaddlist()
	}
})
