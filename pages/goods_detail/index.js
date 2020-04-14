import {
  request
} from '../../request/index.js'
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },
  // 图片预览大图url
  goodsUrl: [],
  // 货物信息
  goodsMsg: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },
  /**
   * 获取商品详情
   */
  getGoodsDetail(goods_id) {
    request({
        url: '/goods/detail',
        data: {
          goods_id
        }
      })
      .then(res => {
        this.goodsMsg = res.data.message
        this.goodsUrl = res.data.message.pics.map(v => v.pics_mid)
        this.setData({
          detail: {
            goods_price:res.data.message.goods_price,
            pics: res.data.message.pics,
            goods_name: res.data.message.goods_name,
            goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
          }
        })
      })
  },
  /**
   * 点击预览大图事件
   */
  handlePriverImage(e) {
    let urls = this.goodsUrl
    let current = e.currentTarget.dataset.mid
    wx.previewImage({
      current,
      urls
    })
  },
  /**
   * 加入购物车事件
   */
  handleCartAdd() {
    let cart = wx.getStorageSync('cart')||[]
    // 判断商品是否存在购物车中
    let index = cart.findIndex(v=> v.goods_id === this.goodsMsg.goods_id)
    if (index === -1 ){
      // 不存在购物车中，第一次添加
      this.goodsMsg.nums = 1
      this.goodsMsg.checked = true
      cart.push(this.goodsMsg)
    }else {
      // 存在购物车中
      cart[index].nums++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
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