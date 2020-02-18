let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');

let array = [];
let arr = [];
let i;
let x;
let arr2 = [];
let arr3 = [];



//导入腾讯地图sdk
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

Page({

  /**
   * 页面的初始数据
   */

  data: {
    city: "",
    bcg:"http://drawrepository.oss-cn-beijing.aliyuncs.com/blog/70c86700cd2e42f5af90fee31051a541.jpg"
  },
  choosebcg:function(){
    wx.navigateTo({
      url: '../bcchoose/bcchoose'
    })
  },
  //监听下拉刷新
  onPullDownRefresh: function() {
     console.log('onPullDownRefresh', '下拉刷新....');
    this.onLoad();
    wx.stopPullDownRefresh;
   },

  //最上方搜索栏
   commitSearch:function(res){
    let val = res.detail.value;
    this.setData({city:val})
    this.loadweather(val);
    this.loadair(val);
    this.loadhour(val)
    this.clearInput(val)
   },
   clearInput(val){
     this.setData({ searchText:""})
   },
  //跳转至城市选择
  choose:function(){
    wx.navigateTo({
      url: '../citychoose/citychoose'
    })
  },
  //从城市选择跳转回来之后
    onChange:function(val){
        this.loadweather(val);
    this.loadair(val);
    this.loadhour(val)
    this.clearInput(val)
   },

   //获取当前的地理位置 （经纬度）
  loadInfo: function() {
    var page = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {

        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(latitude, longitude)
        
        page.loadcity(latitude, longitude);
      }
    })
  },
  loadcity: function(latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=AWUoZbkqiPxVFKctrQFkiCyXrNNBKNZd&location=' + latitude + ',' + longitude + '&output=json',
      data: {
        x: '',
        y: ''
      },
      method: 'GET',

      header: {
        'content-type': 'json'
      },
      success(res) {
        console.log(res)
        var city = res.data.result.addressComponent.city;
        var address = res.data.result.formatted_address;
        city = city.replace("市", "")
        page.setData({
          city: city,
          address: address
        });
        page.loadweather(city);
        page.loadair(city);
        page.loadhour(city);
  
      }
    })

  },
  loadweather: function(city) {
    var page = this;
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/daily.json?key=Shays59gAYm5gDNGJ&days=5&&location=' + city,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.results)

        var future = res.data.results[0].daily
        var today = future.shift();



        //把接口里的日期拿出来放进一个数组array里
        for (i = 0; i < future.length; i++) {
          array.push(future[i].date)
        }
        console.log(array)
        //对上面的array进行遍历处理 即转换为星期格式  然后再把处理好后的数据再放入一个新的数组arr
        for (x in array) {
          var date = new Date(array[x]);
          var day = date.getDay();
          arr.push(show_day[day]);
        }
        //把上面的arr 放入我们接口里的日期数据 替换掉原来未转换的
        console.log(arr);
        for (var y in future) {
          future[y].date = arr[y];
        }

        page.setData({
          today: today,
          future: future
        })
      }
    })
  },

  loadhour: function(city) {
    var page = this;
    wx.request({
      url: 'https://api.seniverse.com/v3/weather/hourly.json?key=Shays59gAYm5gDNGJ&location=' + city,
      data: {
        x: '',
        y: ''
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.results[0])
        //获取24个数组
        var hour = res.data.results[0].hourly;
      

        for (var h = 0; h < hour.length; h++) {
          arr2.push(hour[h].time);
        }
        console.log(arr2);


        for(var j in arr2){
          var date=new Date(arr2[j])

          var futurehour = date.getHours()
         arr3.push(futurehour+":00");
        }

        for(var a in hour){
          hour[a].time=arr3[a];
        }
        page.setData({

          hour: hour

        })
        console.log(arr3);
      }

    })
    

  },
  loadair: function(city) {
    var page = this;
    wx.request({
      url: 'https://api.seniverse.com/v3/air/daily.json?days=5&key=Shays59gAYm5gDNGJ&location=' + city,
      data: {
        x: '',
        y: ''
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.results[0].daily[0])
        var air = res.data.results[0].daily[0].quality
        page.setData({
          todayair: air
        })

      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadInfo();
    wx.getStorage({
      key: 'fullname',
      success(res) {
        console.log(res.data)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})
module.exports = {


  
}