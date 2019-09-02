//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   bannerimg:[
		 {
		 pic:'/static/images/banner_03.png'
		},
		 {
		 pic:'/static/images/banner_03.png'
		},
		 {
		 pic:'/static/images/banner_03.png'
		},
	 ],
	 mdd_data:[
		 {
			 pic:'../../static/images/index_11.png',
			 name:'欧洲'
		 },
		 {
			 pic:'../../static/images/index_13.png',
			 name:'美洲'
		 },
		 {
			 pic:'../../static/images/index_15.png',
			 name:'中东非洲'
		 },
		 {
			 pic:'../../static/images/index_17.png',
			 name:'大洋洲'
		 },
		 {
			 pic:'../../static/images/index_19.png',
			 name:'东南亚'
		 },
		 {
			 pic:'../../static/images/index_30.png',
			 name:'日韩'
		 },
		 {
			 pic:'../../static/images/index_32.png',
			 name:'极地'
		 },
		 {
			 pic:'../../static/images/index_33.png',
			 name:'海岛'
		 },
		 {
			 pic:'../../static/images/index_26.png',
			 name:'国内'
		 },
		 {
			 pic:'../../static/images/index_27.png',
			 name:'更多'
		 },
	 ],
	  indicatorDots: true,
	 autoplay: true,
	 interval: 3000,
	 duration: 1000,
	 circular:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
})
