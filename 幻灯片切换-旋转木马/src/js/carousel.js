;(function($){

  var Carousel = function(poster){
    // 接收每一个独立的容器
    // console.log(poster);

    this.poster = poster;       //  保存单个旋转木马对象
    this.posterItemMain = $(poster).find("ul.poster-list");     // 找到图片ul
    this.nextBtn = $(poster).find("div.poster-next-btn");       // 下一张按钮
    this.prevBtn = $(poster).find("div.poster-prev-btn");       // 上一张按钮
    this.posterFirstItem = $(this.posterItemMain).find("li").eq(0);    // 第一帧幻灯片
    this.posterItems = $(poster).find("li.poster-item");        // 所有幻灯片

    // 默认配置参数
    this.setting = {
      "width": 1000,                // 幻灯片的宽度
      "height": 270,                // 幻灯片的高度
      "posterWidth": 640,           // 图片宽度
      "posterHeight": 270,          // 图片高度
      "scale": 0.9,                 // 每张图的缩放
      "speed": 500,                 // 切换速度
      "veritcalAlign": 'middle'     // 对齐方式，上、下、居中
    };

    // 人工配置的参数覆盖默认参数
    // $.extend(this.setting, {"width": 500})
    $.extend(this.setting, this.getSetting())
    console.log( this.getSetting() );

    this.setSetingValue();
  };
  // 原型
  Carousel.prototype = {
    // 设置配置参数值去控制基本的宽度高度
    setSetingValue: function(){
      // 幻灯片的宽高
      $(this.poster).css({
        width: this.setting.width,
        height: this.setting.height
      });
      // ul图片宽高
      $(this.posterItemMain).css({
        width: this.setting.posterWidth,
        height: this.setting.posterHeight
      })
      // 计算上下切换按钮的宽度
      var w = (this.setting.width - this.setting.posterWidth) / 2;
      $(this.nextBtn).css({width: w, height: this.setting.height});
      $(this.prevBtn).css({width: w, height: this.setting.height});

      //第一帧动画
      $(this.posterFirstItem).css({
        left: w
      })
    },

    // 获取人工配置参数
    getSetting: function(){
      var setting = $(this.poster).data('setting');
      return setting;
    }
  };

  // 处理传进来的这个集合，有多少个就处理多少次
  Carousel.init = function(posters){
    var _this = this;
    posters.each(function(i, elem){
      new _this(elem);
    });
  };

  window['Carousel'] = Carousel;      // 输出全局
})(jQuery);
