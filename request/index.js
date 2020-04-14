  let count = 0
  const request = (params) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // 公共请求头
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
      count++
      wx.request({
        ...params,
        url: baseUrl + params.url,
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        },
        complete: () => {
          count--
          if (count === 0)
            wx.hideLoading()
        }
      });
    })
  }

  const login = (params) => {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 10000,
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        }
      });
    })
  }

  module.exports = {
    request,
    login
  }