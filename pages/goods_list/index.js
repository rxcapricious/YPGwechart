// pages/goods_list/index.js
Page({
   /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id:0,
        value: "综合",
        isActive: true,
      },
      {
        id:1,
        value: "综合",
        isActive: false,
      },
      {
        id:2,
        value: "综合",
        isActive: false,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 标题的点击事件  从子组件传递过来
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    const {index} = e.detail;
    // 修改原数组，产生激活选中
    let {tabs} = this.data;
    tabs.forEach((v,i) => {
      i===index ? v.isActive=true:v.isActive=false
    });
    // 赋值到data中
    this.setData({
      tabs
    })
  }
})