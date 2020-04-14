// component/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * tab栏点击事件
     */
    handleItemTap(e) {
      // 1、获得索引
      // 2、向父级传递参数
      // 3、在父级(goods_list)监听事件获取参数
      const {index} = e.currentTarget.dataset
      this.triggerEvent("tabsItemChange",{index});
    }
  }
})