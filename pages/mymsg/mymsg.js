// pages/mymsg/mymsg.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'member': wx.getStorageSync('member'),
		sex:[
      { name: '男', value: '1' },
      { name: '女', value: '2' },
		],
		region: [],
		index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'member': wx.getStorageSync('member'),
    })
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
    var that =this
    var fs = e.detail.value
    if (fs.name == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入您的姓名'
      })
      return
    }
    if (fs.tel == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号'
      })
      return
    }
    if (!(/^1\d{10}$/.test(fs.tel))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false;
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
        title:'请输入详细地址'
			})
			return
		}
    wx.showModal({
      title: '提示',
      content: '信息提交后将不可更改，请确认无误后进行提交',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '正在提交',
          })
          wx.request({
            url: app.IPurl,
            data: {
              apipage:'edituserinfo',
              realname:fs.name,
              sex:fs.sex,
              phone:fs.tel,
              province: that.data.region[2],
              city: that.data.region[1],
              country: that.data.region[0],
              address:fs.xxaddress,
              "tokenstr": wx.getStorageSync('tokenstr').tokenstr
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            method: 'POST',
            success(res) {
              console.log(res.data)
              

              if (res.data.error == 0) {

                wx.showToast({
                  icon: 'none',
                  title: '提交成功',
                  duration: 2000
                })
                app.dologin()
                setTimeout(function () {
                  wx.navigateBack()
                }, 1000)

              } else {
                if (res.data.returnstr) {
                  wx.showToast({
                    icon: 'none',
                    title: res.data.returnstr
                  })
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: '操作失败'
                  })
                }
              }


            },
            fail() {
              wx.showToast({
                icon: 'none',
                title: '操作失败'
              })
            },
            complete(){
              wx.hideLoading()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
		
  },
})