// pages/home/home.js
import  {getMultiData } from '../../service/homeNetwork'
Page({
  //页面的初始数据
  data: {
    banner:[],
    recommend:[]
  },

 // 生命周期函数--监听页面加载
  onLoad: function (options) {
    getMultiData().then( res => {
      // console.log(res);
      const banner = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setData({
        banner,
        recommend
      })
    })
  }
})