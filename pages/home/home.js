// pages/home/home.js
import  { getMultiData, getGoodsData } from '../../service/homeNetwork'
const types = ['pop','new','sell']     //定义的全局变量
const topDistance = 1000
Page({
  //页面的初始数据
  data: {
    banner:[],
    recommend:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentType:'pop',
    isShowBackTop:false,
    isTabFixed:false,
    tabScrollTop: 0
  },

 // 生命周期函数--监听页面加载
  onLoad: function (options) {
    //请求首页头部的多个数据
    this._getMultiData(),
    //请求首页商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },


  //----------------------------------------------网络请求相关函数-----------------------------------------------
  //下划线表示为私有函数
  _getMultiData(){
    getMultiData().then( res => {
      // console.log(res);
      const banner = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setData({
        banner,
        recommend
      })
    })
  },
  _getGoodsData(type){
    //1，获取页码
    const page = this.data.goods[type].page + 1
    //2，进行网络请求
    getGoodsData(type,page).then((res)=>{
      // console.log(res);
      //2.1取出数据
      const list = res.data.data.list
      // this.data.goods[type].list.push(...list) //这样不能做到页面的响应式，必须通过this.setData方法
      // 2.2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`  //es6模板字符串可用于解析变量和函数
      const pageKey = `goods.${type}.page`
      this.setData({        //不是直接改变某个原始数据（goods），而是改变某个原始数据中的某个属性(goods[type].list)
        [typeKey]: oldList, //相当于将oldList,重新赋值给某list
        [pageKey]: page     //更新页码
      })
    })
  },


  //----------------------------------------------事件监听相关函数-------------------------------------------------
  tabClick(e) {
    // console.log(e);
    const index = e.detail.index
    // console.log(index);
    this.setData({
    currentType: types[index]
    })
  },
  imageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      // console.log(rect);
      this.data.tabScrollTop = rect.top  //这里不需要调用setData()方法，不用在页面渲染
    }).exec()
  },
  onReachBottom(){  //监听到达底部
    // console.log('滚动到底部了');
    // 首页的上拉加载更多
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options){  //监听页面滚动
    // console.log(options)
    // 官方: 不要再滚动的函数回调中频繁的调用this.setData()
    // 一，取出scrollTop
    const scrollTop = options.scrollTop
    // 二, 修改isShowBackTop属性的值
    // 2.1，将scrollTop与某值相比较
    const flag1 = scrollTop >= topDistance
    // 2.2，将比较结果与isShowBackTop初始值相比较（此判断条件则不会频繁的调用this.setData()）
    if(flag1 !== this.data.isShowBackTop) {  
      this.setData({
        isShowBackTop : flag1
      })
    }
    // 三.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})