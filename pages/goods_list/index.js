/* 1、用户上滑  触底加载下一页
      1、找到滚动条触底事件
      2、判断下一页有无数据
         1、获取总页数
          总页数 = Math.ceil(总条数 / 页容量pagesize)
         2、获取到当前页码   pagenum
         3、判断当前页码是否大于等于总页数
      3、若无数据，就弹出提示框
      4、有就继续加载
         1、当前页码 ++
         2、重新发送请求
         3、数据请求回来  需要将数组进行拼接

2、下拉刷新页面
   1、触发下拉刷新事件  需要在页面的json文件中开启配置项
   2、重置  数据 数组
   3、重置页面  设置为1
   4、重新发送请求
   5、数据请求回来需要手动关闭等待效果

*/

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

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
    ],
    goodsList: [],
  },

  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total = res.total;
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })

    // 关闭下拉刷新接口
    wx.stopPullDownRefresh();
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
  },

  // 页面滚动条触底事件
  onReachBottom() {
    // 1、判断还有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages) {
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
      });
    }else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    // 1、重置数组
    this.setData({
      goodsList:[]
    })
    // 更改页码
    this.QueryParams.pagenum=1;
    // 3、发送请求
    this.getGoodsList();
  }
})