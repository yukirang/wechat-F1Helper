//index.js
//获取应用实例
const util = require('../../utils/util.js');

const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    canBg: './images/yellow.jpeg',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindDriverTap: function () {
    wx.navigateTo({
      url: '../driver/driver'
    })
  },
  bindShareTap: function(){
    console.log(util);
    var that = this;
    that.drawShareCanvas(that.data.canBg);
    /*wx.getImageInfo({
      src: that.data.canBg,
      success: function (res) {
        
        let imgPath = res.path;
        that.drawShareCanvas(imgPath);
       
      },
      fail: function(res){
        console.log(res);
      }
    })   
  },*/
  },
  drawShareCanvas: function(path){
    var that = this;
   
    const ctx = wx.createCanvasContext('shareCanvas');
    ctx.setFillStyle('white');
    ctx.drawImage(path,0,0,200,300);
    ctx.draw(true);
    ctx.setFillStyle('#000')
    ctx.setFontSize(0.037 * 300)
    ctx.setTextAlign('left')
    ctx.fillText('保存二维码分享到朋友圈', 50 / 2, 1.36 * 50)
    ctx.draw(true);
    setTimeout(function canvasToImage() {
      var that = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 200,
        height: 300,
        destWidth: 800,
        destHeight: 1100,
        canvasId: 'shareCanvas',
        success: function (res) {
          console.log(res.tempFilePath);

          wx.previewImage({
            current: res.tempFilePath, // 当前显示图片的http链接
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },200);


  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'Hello World',
      path: '/pages/index/index',
      imgUrl: '',
    }
  }
  
})
