// pages/home/childCpns/s-recommend/s-recommend.js
Component({
 // 组件的属性列表
  properties: {
    recommend:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgLoad(){
      if(!this.data.isLoad){  //类似于节流阀(先关闭再打开)
        this.triggerEvent('imageLoad')
        this.data.isLoad = true
        console.log('图片加载完成');
      }
    }
  }
})
