// components/s-back-top/s-back-top.js
Component({
 //组件的属性列表
  properties: {
  },
// 组件的初始数据
  data: {
  },
  // 组件的方法列表
  methods: {
    backTopClick(){
      // console.log('回到顶部');
      wx.pageScrollTo({
        duration: 400,
        scrollTop:0
      })
    }
  }
})
