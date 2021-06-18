import { baseUrl } from './config'

//对网络请求进行一层包装
export default function(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data || {},
      method: options.method || 'get',
      timeout: options.timeout || 20000,
      success: resolve,
      fail: reject,
    })
  })
}