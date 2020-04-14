// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品/商家投诉',
        isActive: false
      }
    ],
    chooseImg:[],
    textVal: ''
  },
  timeId: -1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 添加图片
   */
  handleChooseImg: function () {
    let than = this
    wx.chooseImage({
      // 同时选中图片的数量
      count: 9,
      // 大小类型：原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片来源： 相机 相册
      sourceType: ['album', 'camera'],
      success: (result) => {
        than.setData({
          chooseImg: [...this.data.chooseImg, ...result.tempFilePaths]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 删除图片事件
   */
  handleDelete:function (e){
    let {index} = e.currentTarget.dataset
    let arr = this.data.chooseImg
    arr.splice(index,1)
    this.setData({
      chooseImg:arr
    })
  },
  /**
   * 文本域输入事件
   */
  handleTextInput:function(e){
    let than = this
    let textVal = e.detail.value.trim()
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      than.setData({
        textVal
      })
    }, 1000)
  },
  /**
   * 提交事件
   */
  handleUpLoad:function (){
    this.setData({
      chooseImg: [],
      textVal: ''
    })
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * tabs组件事件
   */
  handleItemChange: function (e) {
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