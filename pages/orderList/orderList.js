//logs.js
var htmlStatus = require('../../utils/htmlStatus/index.js')
const app = getApp()

Page({
  data: {
		btnkg:0,
		htmlReset:0,
		datalist:[
			'全部',
			'未接单',
      '进行中',
			'待确认',
			'已确认',
			'已完成',
		],
    status:[
      '-99',
      '0',
      '1',
      '2',
      '3',
      '4',
    ],
    pages: [1, 1, 1, 1, 1, 1],
		type:0,
		goods:[
      [],
      [],
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
    var pages = [1, 1, 1, 1, 1, 1]
    var goods = [[], [], [], [], [], [],]
		this.data.goods=goods
		this.setData({
			pages:pages,
			goods:this.data.goods
		})
		if (this.data.btnkg==1){
			that.setData({
				btnkg:0
			})
		}
		console.log('我显示了')
		this.getOrderList('onshow')
	},
	retry(){
    var pages = [1, 1, 1, 1, 1, 1]
    var goods = [[], [], [], [], [], [],]
    this.data.goods = goods
    this.setData({
      pages: pages,
      goods: this.data.goods
    })
		this.getOrderList()
	},
	onReady(){
		
	},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉')
    
    this.retry()
  },
	 /**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.getOrderList()
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
    const htmlStatus1 = htmlStatus.default(that)
    htmlStatus1.finish()
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
		const htmlStatus1 = htmlStatus.default(that)
		console.log('获取列表')
		// return
    /*0 未接单   （用户刚发布）
    1 进行中  （师傅接单后）
    2 待确认  （师傅提交报价）
    3 已确认   （用户同意此报价）
    4 已完成   （师傅点完成）*/
		wx.request({
			url:  app.IPurl,
			data:{
        apipage:'smwx',
        "tokenstr": wx.getStorageSync('tokenstr').tokenstr,
        op:'orderlist_user',
        "pageindex": that.data.pages[that.data.type],
        "pagesize": "20",
        "status": that.data.status[that.data.type]
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded' 
			},
			dataType:'json',
			method:'get',
			success(res) {
        // 停止下拉动作
        wx.stopPullDownRefresh();
        console.log(res)
				if(res.data.error==0){   //成功
						console.log(ttype)
						let resultd=res.data.list
						if(ttype=='onshow'){
              var pages = [1, 1, 1, 1, 1, 1]
              var goods = [[], [], [], [], [], [] ]
							that.data.goods=goods
						}
						
						if(res.data.list.length==0){  //数据为空
              if (that.data.pages[that.data.type]==1){      //第一次加载
								htmlStatus1.dataNull()    // 切换为空数据状态
							}else{
								wx.showToast({
									icon:'none',
									title:'暂无更多数据'
								})
							}
							
						}else{                           //数据不为空
							that.data.goods[that.data.type]=that.data.goods[that.data.type].concat(resultd)
							that.data.pages[that.data.type]++
							that.setData({
								goods:that.data.goods,
								pages:that.data.pages,
							})
							console.log(that.data.goods)
								htmlStatus1.finish()    // 切换为finish状态
						}
						// console.log(res.data.list)
						
						
				}else{  //失败
          if (res.data.returnstr){
						wx.showToast({
							icon:'none',
              title: res.data.returnstr
						})
					}else{
						wx.showToast({
							icon:'none',
							title:'加载失败'
						})
					}
					htmlStatus1.error()    // 切换为error状态
				}
				
				// htmlStatus1.error()    // 切换为error状态
			},
			fail(err) {
				wx.showToast({
					icon:"none",
					title:"加载失败"
				})
				
				console.log(err)
				 htmlStatus1.error()    // 切换为error状态
			},
			complete() {
				wx.setNavigationBarTitle({
					title:'订单列表'
				})
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
