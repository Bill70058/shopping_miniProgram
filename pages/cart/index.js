// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    carts: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 选择地址按钮事件
   */
  handleChooseAddress() {
    try {
      // 获取权限值
      wx.getSetting({
        success: (result) => {
          let scopeAddress = result.authSetting['scope.address']
          // 如果地址权限已经同意或未使用过，打开获取地址接口
          if (scopeAddress === false) {
            wx.openSetting({
              success: (result) => {
                console.log(result)
              }
            });
          }
          // ------------------
          wx.chooseAddress({
            success: (result) => {
              // 将地址信息存入缓存中
              result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
              wx.setStorageSync('address', result)
            }
          });
        }
      });
    } catch (err) {
      console.log(err)
    }
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
    let address = wx.getStorageSync('address')
    this.setData({
      address
    })
    let carts = wx.getStorageSync('cart') || []
    this.setCart(carts)

  },
  /**
   * 购物车商品勾选事件
   */
  handleChange(e) {
    let id = e.currentTarget.dataset.id
    let {
      carts
    } = this.data
    let index = carts.findIndex(v => v.goods_id === id)
    carts[index].checked = !carts[index].checked

    // 将数据更新到缓存与data中
    this.setCart(carts)
  },
  /**
   * 全选事件
   */
  handleAllChange() {
    let {
      carts,
      allChecked
    } = this.data
    allChecked = !allChecked
    carts.forEach(v => {
      if (allChecked) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({
      carts,
      allChecked
    })
    this.setCart(carts)
  },

  /**
   * 设置购物车
   */
  setCart(carts) {
    let allChecked = true
    let totalPrice = 0,
      totalNum = 0
    carts.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.nums
        totalNum += v.nums
      } else {
        allChecked = false
      }

    })
    if (carts.length === 0) {
      allChecked = false
    }
    wx.setStorageSync('cart', carts)
    this.setData({
      carts,
      totalNum,
      totalPrice,
      allChecked
    })
  },
  /**
   * 增加数量
   */
  handleAddNum(e) {
    let {
      id
    } = e.currentTarget.dataset
    let {
      carts
    } = this.data
    let index = carts.findIndex(v => v.goods_id === id)
    carts[index].nums++
    this.setData({
      carts
    })
    this.setCart(carts)
  },
  /**
   * 减少数量
   */
  handleSubtract(e) {
    let than = this
    let {
      id
    } = e.currentTarget.dataset
    let {
      carts
    } = this.data
    let index = carts.findIndex(v => v.goods_id === id)
    if (carts[index].nums === 1) {
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品',
        success: (result) => {
          if (result.confirm) {
            carts.splice(index, 1)
            than.setCart(carts)
          } else {
            console.log(result.confirm)
          }
        },
        fail: () => {},
        complete: () => {}
      });
    } else {
      carts[index].nums--
    }
    this.setData({
      carts
    })
    this.setCart(carts)
  },
  /**
   * 商品结算事件
   */
  handleAccount() {
    let carts = wx.getStorageSync('cart')
    let address = wx.getStorageSync('address')
    let checkedCart = carts.filter(v => v.checked)
    if (carts.length === 0 || checkedCart.length === 0) {
      wx.showToast({
        title: '购物车为空，请加购商品',
        icon: 'none',
        mask: true,
        success: (result) => {
          return
        }
      });
    } else if (address === '') {
      wx.showToast({
        title: '地址为空，请选择地址',
        icon: 'none',
        mask: true,
        success: (result) => {
          return
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/pay/index?totalPrice='+this.data.totalPrice+'&totalNum='+this.data.totalNum,
        success: (result) => {
          return
        }
      });
    }
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