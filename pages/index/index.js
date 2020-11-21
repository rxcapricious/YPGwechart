// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],   //轮播图数组
    catesList: [],   //分类导航数组
    floorList: [],   //楼层
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

   // 获取轮播图数组
  getSwiperList: function() {
    let that = this;
    request({url: '/home/swiperdata'})
    .then(result => {
      that.setData({
        swiperList: result
      })
    })
  },
  
  // 获取分类导航数组
  getCatesList: function() {
    let that = this;
    request({url: '/home/catitems'})
    .then(result => {
      that.setData({
        catesList: result
      })
    })
  },

  // 获取分类导航数组
  getFloorList: function() {
    let that = this;
    request({url: '/home/floordata'})
    .then(result => {
      that.setData({
        floorList: result
      })
    })
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