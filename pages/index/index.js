// 导入封装的请求
import {
  request
} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  /**
   * 获取轮播图
   */
  getSwiperList() {
    request({
        url: '/home/swiperdata'
      })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  /**
   * 获取导航图片
   */
  getCateList() {
    request({
      url: '/home/catitems'
    })
    .then(result => {
      this.setData({
        cateList: result.data.message
      })
    })
  },
  /**
   * 获取楼层图片
   */
  getFloorList() {
    request({
      url: '/home/floordata'
    })
    .then(result => {
      let floorList = result.data.message
      floorList.forEach(v => {
        v.product_list.forEach(i => {
          let keyWord = i.navigator_url.slice(24)
          i.navigator_url = '/pages/goods_list/index?query='+keyWord
        })
      })
      this.setData({
        floorList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
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