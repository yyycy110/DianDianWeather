

// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'EKTBZ-ZN73W-6HHRY-REYWW-Y6SMK-64BQL' // 必填
});

var array = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  cancel:function(){
    this.setData({ searchText:""})

  },

 find:function(e){
   var name = e.detail.value;
   qqmapsdk.getCityList({
     success: function (res) {//成功后的回调
       console.log(res);
       console.log('省份数据：', res.result[0]); //打印省份数据
       console.log('城市数据：', res.result[1]); //打印城市数据
       console.log('区县数据：', res.result[2]); //打印区县数据

 
       
       console.log(array)

     },
   });
 },

 //搜索栏回车后跳转回原页面并且传city数据过去
  select:function(e){
    var dataset = e.currentTarget.dataset;
    var cityname = dataset.fullname;
    //获取当前页面栈
    var pages = getCurrentPages();
    //获取上一个页面
    var prevPage = pages[pages.length - 2];
    
    var cityname=e.detail.value;



    wx.navigateBack({
      success:function(){
      prevPage.onChange(cityname)
        prevPage.setData({
          city: cityname

        });
      }
    })
    
  
  },
  
  selectCity:function(e){
    var dataset = e.currentTarget.dataset;
    var cityname = dataset.fullname;
    //获取当前页面栈
    var pages = getCurrentPages();
    //获取上一个页面
    var prevPage = pages[pages.length - 2]; 
    
    
    console.log(dataset)
    this.setData({
      citySelected: dataset.fullname,
      searchText:cityname,
      location: {
        latitude: dataset.lat,
        longitude: dataset.lng
      }

     
    });
    
    
    wx.navigateBack({
     success:function(){
       prevPage.onChange(cityname);
       prevPage.setData({
         city:cityname
       })
     }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var page = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
       
       //遍历城市
        var address=res.result[0]
        page.setData({
       address:address
        })
        

        for(var i=0;i<address.length;i++){
          array.push(address[i])
        }
     
        console.log(array)
   
      
      },
  
    });
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