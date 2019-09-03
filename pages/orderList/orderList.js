//logs.js
// var pageState = require('../../utils/pageState/index.js')
const app = getApp()

Page({
  data: {
		btnkg:0,
		htmlReset:0,
		datalist:[
			'全部',
			'未接单',
			'进行中',
			'已完成',
			'评价',
		],
		pages:[1,1,1,1,1],
		type:0,
		goods:[
				[
					{
						status:1,
						content:'家具损坏，进行修复',
						type:'门窗家具维修',
						type1:' 家具维修',
						time:'2019-07-25'
					},
					{
						status:2,
						content:'家具损坏，进行修复',
						type:'门窗家具维修',
						type1:' 家具维修',
						time:'2019-07-25'
					},
					{
						status:3,
						content:'家具损坏，进行修复',
						type:'门窗家具维修',
						type1:' 家具维修',
						time:'2019-07-25'
					}
				],
				[],
				[],
				[],
				[],
		],
		shopNum:[],
		sum:0,
		otype:-2
  },
  onLoad: function (option) {
		wx.setNavigationBarTitle({
			title:'加载中...'
		})
    if(option.id){
			console.log(option.id)
		}
		wx.setNavigationBarTitle({
			title: '订单列表'
		})
		if(option.type){
			this.setData({
				type:option.type
			})
		}
		
		
		
  },
	onShow(){
		// var pages=[1,1,1,1,1]
		// var goods=[ [],[],[],[],[], ]
		// this.data.goods=goods
		// this.setData({
		// 	pages:pages,
		// 	goods:this.data.goods
		// })
  //   if (this.data.btnkg==1){
		// 	that.setData({
		// 		btnkg:0
		// 	})
		// }
		console.log('我显示了')
		// this.getOrderList('onshow')
	},
	cload(){
		var pages=[1,1,1,1,1]
		var goods=[ [],[],[],[],[], ]
		this.data.goods=goods
		this.setData({
			pages:pages,
			goods:this.data.goods
		})
		console.log('我显示了')
		// this.getOrderList('onshow')
	},
	onReady(){
		
	},
	jump(e){
		app.jump(e)
	},
	bindcur(e){
		var that =this
	  console.log(e.currentTarget.dataset.type)
	  that.setData({
	    type: e.currentTarget.dataset.type
	  })
		// that.getOrderList()
		if(that.data.goods[that.data.type].length==0){
			that.getOrderList()
		}
	},
	gopinlun(e){
		wx.navigateTo({
			url:'/pages/fabiaopl/fabiaopl?oid='+e.currentTarget.dataset.oid
		})
	},
	//获取列表
	getOrderList(ttype){
	
		let that = this
		return
		wx.request({
			url:  app.IPurl+'/api/orderList',
			data:{
				token:wx.getStorageSync('token'),
				status_code:that.data.type,
				page:that.data.pages[that.data.type],
				page_length:10
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'get',
			success(res) {
				if(res.data.code==1){
					wx.setNavigationBarTitle({
						title:'订单列表'
					})
					that.setData({
						htmlReset:0
					})
						console.log(ttype)
						let resultd=res.data.data
						if(ttype=='onshow'){
							var pages=[1,1,1,1,1]
							var goods=[ [],[],[],[],[], ]
							that.data.goods=goods
						}
						if(resultd.length>0){
							that.data.goods[that.data.type]=that.data.goods[that.data.type].concat(resultd)
							that.data.pages[that.data.type]++
							that.setData({
								goods:that.data.goods,
								pages:that.data.pages,
							})
							console.log(that.data.goods)
						}else{
							wx.showToast({
								icon:"none",
								title:"没有更多数据了"
							})
						}
						// console.log(res.data.list)
						
						
				}else{
					wx.showToast({
						icon:"none",
						title:"获取失败"
					})
					that.setData({
						htmlReset:1
					})
					console.log(res.data)
				}
				
				// pageState1.finish()    // 切换为finish状态
			},
			fail(err) {
				wx.showToast({
					icon:"none",
					title:"获取失败"
				})
				that.setData({
					htmlReset:1
				})
				console.log(err)
				 // pageState1.error()    // 切换为error状态
			}
		})
	},
	//订单详情
	goOrderDetails(e){
		console.log(e.currentTarget.dataset.id)
		wx.navigateTo({
			url:'/pages/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id
		})
	},
	//付款
	pay(e){
    var that =this
		let oid=e.currentTarget.dataset.code
		if(that.data.btnkg==1){
			return
		}else{
			that.setData({
				btnkg:1
			})
		}
		app.Pay(oid,'info')
	},
	onRetry(){
		this.onLoad()
	}
})
