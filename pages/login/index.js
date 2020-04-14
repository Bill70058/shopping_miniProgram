// pages/login/index.js
import {
  request,
  login
} from '../../request/index'
// import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 登陆事件
   */
   async handleGetUserInfo(e) {
    let than = this
    let {
      userInfo,
      encryptedData,
      iv,
      rawData,
      signature
    } = e.detail

    let {code} = await login()
    let resData = {
      encryptedData,
      iv,
      rawData,
      signature,
      code
    }

    let res = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
      data: resData,
      method: 'POST',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      detal: 1
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

  }
})