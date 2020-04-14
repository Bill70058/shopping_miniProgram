// pages/goods_list/index.js
import {
  request
} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  /**
   * 请求需要的参数
   */
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  total: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid||''
    this.queryParams.query = options.query||''
    this.getGoodsList()
  },
  /**
   * 获取货物信息列表
   */
  getGoodsList() {
    let than = this
    request({
        url: '/goods/search',
        data: than.queryParams
      })
      .then(res => {
        than.total = Math.ceil(res.data.message.total / than.queryParams.pagesize)
        than.setData({
          goodsList: [...than.data.goodsList, ...res.data.message.goods]
        })
      })
      wx.stopPullDownRefresh()
  },
  /**
   * Tabs组件监听事件
   */
  handleItemChange(e) {
    const {
      index
    } = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
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
    this.setData({
      goodslist: []
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum === this.total) {
      wx.showToast({
        title: '已经到底部了',
        icon: 'none'
      });
    } else {
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})