//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		bannerimg: [{
				pic: '/static/images/index_03.png'
			},
			{
				pic: '/static/images/index_03.png'
			},
			{
				pic: '/static/images/index_03.png'
			},
		],
		fw_data: [{
				pic: '../../static/images/index_07.png',
				name: '管道疏通'
			},
			{
				pic: '../../static/images/index_09.png',
				name: '家电维修'
			},
			{
				pic: '../../static/images/index_11.png',
				name: '灯具电路'
			},
			{
				pic: '../../static/images/index_13.png',
				name: '卫浴洁具'
			},
			{
				pic: '../../static/images/index_19.png',
				name: '门窗维修'
			},
			{
				pic: '../../static/images/index_20.png',
				name: '门锁开换'
			},
			{
				pic: '../../static/images/index_21.png',
				name: '家具安装'
			},
			{
				pic: '../../static/images/index_22.png',
				name: '家电清洗'
			},
		],

		hot_data: [{
				pic: '../../static/images/index_28.jpg',
				name: '水龙头维修'
			},
			{
				pic: '../../static/images/index_31.jpg',
				name: '空调维修'
			},
			{
				pic: '../../static/images/index_33.jpg',
				name: '家电维修'
			},
		],
		cai_data:[
			{
					pic: '../../static/images/index_42.jpg',
					name: '水龙头维修'
				},
				{
					pic: '../../static/images/index_43.jpg',
					name: '空调维修'
				},
				{
					pic: '../../static/images/index_47.jpg',
					name: '家电维修'
				},
				{
					pic: '../../static/images/index_48.jpg',
					name: '家电维修'
				},
		],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		circular: true
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function() {

	},
})
