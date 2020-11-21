import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 
    scrollTop: 0,
    
  },

  // 接口返回的数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    使用缓存数据
    1、先判断本地缓存中是否有旧数据
        存储格式：   {time:  }
    2、没有旧数据，就发起请求
    3、有旧数据时，且旧数据未过期（怎么去知道是否是过期？）   就使用
    */
  //  1   获取本地存储的数据
  const Cates = wx.getStorageSync('catesNew');
  
  if (!Cates) {
    // 不存在就重新发起请求
    this.getCate();
  }else {
    // 有旧的数据  仍需要判断是否过期
    // 暂时定义过期时间
    if(Date.now()-Cates.time>1000*10) {
      // 重新发送请求
      this.getCate();
    }else {
      // 可以使用旧数据
      this.Cates = Cates.data;
       // 构造左侧的菜单数据
       let leftMenuList = this.Cates.map(v => v.cat_name);

       // 构造右侧商品数据
       let rightContent = this.Cates[0].children;
       this.setData({
         leftMenuList,
         rightContent
       })
    }

  }
  },

  // 获取分类数据
  async getCate() {
    // request({
    //   url: '/categories',
    // })
    // .then(res => {
    //   this.Cates = res.data.message;

    //   // 把接口数据存入本地中
    //   wx.setStorageSync('catesNew', {time:Date.now(),data:this.Cates})

    //   // 构造左侧的菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);

    //   // 构造右侧商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用es7的async   await来发送异步请求
    const res = await request({url: '/categories'});
    this.Cates = res;

    // 把接口数据存入本地中
    wx.setStorageSync('catesNew', {time:Date.now(),data:this.Cates})

    // 构造左侧的菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);

    // 构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // 获取被点击标题的索引
    // 给currentIndex赋值
    const {index} = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
      this.setData({
        currentIndex: index,
        rightContent,
        // 重新设置  右侧内容的scroll  view标签距离顶部的距离
        scrollTop: 0
      })

      
  }

})