import {request} from '../../request/index.js'
// pages/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    inputVal: '',
    isCancel: false
  },
  timeId: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 输入搜索事件
   */
  handleInput(e) {
    let than = this
    let {
      value
    } = e.detail
    // 如果输入框为空
    if (!value.trim()) {
      this.setData({
        goods: [],
        isCancel: false
      })
      return
    }
    // 如果输入框不为空
    // 1、清除定时器
    // 2、创建新的定时器
    clearTimeout(this.timeId)
    this.timeId = setTimeout(()=>{
      than.setData({
        isCancel:true
      })
      than.querys(value)
    },1000)
  },
  /**
   * 发送搜索请求
   */
  async querys(query) {
    let {data} = await request({ url:'/goods/qsearch',data:{query}})
    this.setData({
      goods:data.message
    })
  },
  /**
   * 清除输入框事件
   */
    handleCancel: function (){
      this.setData({
        isCancel:false,
        inputVal: '',
        goods: []
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
  onShow: async function () {

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