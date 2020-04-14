import {
  request
} from '../../request/index'
// import {
//   regeneratorRuntime
// } from '../../lib/runtime/runtime.js'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    // 当前点击的下标
    targetIndex: 0,
    // 记录滚动条Scroll-top变量（滚动顶部）
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Cate = wx.getStorageSync('Cate')
    if (!Cate) {
      // 不存在本地数据，发送请求获取数据
      this.getCateList()
    } else {
      if (Date.now() - Cate.time > 500 * 1000) {
        this.getCateList()
      } else {
        this.Cates = Cate.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  /**
   * 获取分类菜单 
   */
  getCateList() {
    request({
      url: '/categories'
    })
      .then(result => {
        this.Cates = result.data.message
        wx.setStorageSync('Cate', {time:Date.now(),data: this.Cates})
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      })
    
  },
  /**
   * 左侧菜单点击事件：
   * 1、更新右侧内容
   * 2、更新菜单栏选中项效果
   */
  handleItemTap(e) {
    const {
      index
    } = e.target.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      targetIndex: index,
      rightContent,
      // 每次切换内容时都滚动到顶部
      scrollTop: 0
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