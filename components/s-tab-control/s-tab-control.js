// components/tab-control/tab-control.js
Component({
 //组件的属性列表
 //用于声明需要从外部获取的属性
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

 //组件的初始数据
  data: {
    currentIndex: 0
  },

  // 组件的方法列表
  methods: {
    itemClick(e){
      // console.log(e);
      //1，设置最新的currentindex
      this.setData({
        currentIndex : e.currentTarget.dataset.index
      })
      //2，发出点击事件并将index等参数传递出去
      const data = {index: this.data.currentIndex}
      this.triggerEvent('tabClick',data,{})
    }
  }
})
