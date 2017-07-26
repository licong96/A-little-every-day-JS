;(function($){

  var Carousel = function(poster){
    // 接收每一个独立的容器
    // console.log(poster);
    var self = this;
    this.poster = poster;       //  保存单个旋转木马对象
    this.posterItemMain = $(poster).find("ul.poster-list");     // 找到图片ul
    this.nextBtn = $(poster).find("div.poster-next-btn");       // 下一张按钮
    this.prevBtn = $(poster).find("div.poster-prev-btn");       // 上一张按钮
    this.posterItems = $(poster).find("li.poster-item");        // 所有幻灯片

    // 如果传入的图片是偶数，就复制一份，以保住能有就好的效果
    if (this.posterItems.size()%2 == 0) {
      this.posterItemMain.append(this.posterItems.eq(1).clone());   // 复制第二张比第一张好看一点
      this.posterItems = this.posterItemMain.children();
    }

    this.posterFirstItem = $(this.posterItemMain).find("li").first();    // 第一帧幻灯片
    this.posterLastItem = $(this.posterItemMain).find("li").last();    // 最后一帧幻灯片
    this.rotateFlag = true;     // 标识开关
    this.timer = null;           // 定时器

    // 默认配置参数
    this.setting = {
      "width": 1000,                // 幻灯片的宽度
      "height": 270,                // 幻灯片的高度
      "posterWidth": 640,           // 图片宽度
      "posterHeight": 270,          // 图片高度
      "scale": 0.9,                 // 每张图的缩放
      "speed": 500,                 // 切换速度
      "autoPlay": false,            // 自动播放
      "delay": 3000,                // 自动播放速度
      "veritcalAlign": 'middle'     // 对齐方式，上、下、居中
    };

    // 人工配置的参数覆盖默认参数
    // $.extend(this.setting, {"width": 500})
    $.extend(this.setting, this.getSetting())
    // console.log( this.getSetting() );

    this.setSetingValue();

    this.setPosterPos();

    // 下一张左旋转
    this.nextBtn.click(function(){
      if (self.rotateFlag) {
        self.rotateFlag = false;
        self.carouseRotate('left');
      }
    })
    // 上一张右旋转
    this.prevBtn.click(function(){
      if (self.rotateFlag) {
        self.rotateFlag = false;
        self.carouseRotate('right');
      }
    })

    // 是否开启自动播放
    if (this.setting.autoPlay) {
      this.autoPlay();
      // 鼠标放到该区域，清除自动播放
      $(this.poster).hover(function() {
        window.clearInterval(self.timer)
      }, function() {
        self.autoPlay();
      })
    }
  };
  // 原型
  Carousel.prototype = {
    // 自动播放
    autoPlay: function() {
      var self = this;
      this.timer = window.setInterval(function() {
        self.nextBtn.click();
      }, this.setting.delay)
    },

    // 上一帧，下一帧旋转
    carouseRotate: function(dir) {
      var _this_ = this;
      var zIndexArr = [];

      if (dir === 'left') {

        this.posterItems.each(function() {
          var self = $(this),
              prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
              width = prev.width(),
              height = prev.height(),
              zIndex = prev.css('zIndex'),
              opacity = prev.css('opacity'),
              left = prev.css('left'),
              top = prev.css('top');

          zIndexArr.push(zIndex);
          self.animate({
            width: width,
            height: height,
            opacity: opacity,
            left: left,
            top: top
          }, _this_.setting.speed, function() {
            _this_.rotateFlag = true;
          })
        });
        this.posterItems.each(function(i) {
          $(this).css('zIndex', zIndexArr[i])
        })

      } else if (dir === 'right') {
        this.posterItems.each(function() {
          var self = $(this),
              next = self.next().get(0)?self.next():_this_.posterFirstItem,
              width = next.width(),
              height = next.height(),
              zIndex = next.css('zIndex'),
              opacity = next.css('opacity'),
              left = next.css('left'),
              top = next.css('top');

          zIndexArr.push(zIndex);
          self.animate({
            width: width,
            height: height,
            opacity: opacity,
            left: left,
            top: top
          }, _this_.setting.speed, function() {
            _this_.rotateFlag = true;
          })

        });
        this.posterItems.each(function(i) {
          $(this).css('zIndex', zIndexArr[i])
        })
      }
    },

    // 设置剩余的帧的位置关系
    setPosterPos: function() {
      var self = this;
      var sliceItems = this.posterItems.slice(1),
          sliceSize = sliceItems.size()/2,
          rightSlice = sliceItems.slice(0, sliceSize),
          level = Math.floor(this.posterItems.size()/2),
          leftSllice = sliceItems.slice(sliceSize)

      // 设置右边帧的位置关系和宽高top
      var rw = this.setting.posterWidth,
          rh = this.setting.posterHeight,
          gap = ((this.setting.width - this.setting.posterWidth)/2)/level;    // 间隔

      var firstLeft = (this.setting.width - this.setting.posterWidth)/2;
      var fixOffsetLeft = firstLeft + rw;

      rightSlice.each(function(i) {
        level --;
        rw = rw*self.setting.scale;
        rh = rh*self.setting.scale
        var j = i;

        $(this).css({
          zIndex: level,
          width: rw,
          height: rh,
          opacity: 1/(++j),
          left: fixOffsetLeft+(++i)*gap-rw,
          top: self.setVertucalAlign(rh) // (self.setting.height-rh)/2
        })
      })

      // 设置左边帧的位置关系和宽高top
      var lw = rightSlice.last().width(),
          lh = rightSlice.last().height(),
          oloop = Math.floor(this.posterItems.size()/2)

      leftSllice.each(function(i) {

        $(this).css({
          zIndex: i,
          width: lw,
          height: lh,
          opacity: 1/oloop,
          left: i*gap,
          top: self.setVertucalAlign(lh) // (self.setting.height-lh)/2
        })
        lw = lw/self.setting.scale;
        lh = lh/self.setting.scale;
        oloop --
      })
    },

    // 设置垂直排列对齐
    setVertucalAlign: function(height) {
      var verticalType = this.setting.veritcalAlign,
          top = 0;

      if (verticalType === 'middle') {
        top = (this.setting.height - height) / 2;
      } else if (verticalType === 'top') {
        top = 0 ;
      } else if (verticalType === 'bottom') {
        top = this.setting.height - height
      } else {
        top = (this.setting.height - height) / 2;
      }

      return top;
    },

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
      $(this.nextBtn).css({
        width: w,
        height: this.setting.height,
        zIndex: Math.ceil(this.posterItems.size()/2)
      });
      $(this.prevBtn).css({
        width: w,
        height: this.setting.height,
        zIndex: Math.ceil(this.posterItems.size()/2)    // 向上取整
      });

      //第一帧动画
      $(this.posterFirstItem).css({
        width: this.setting.posterWidth,
        height: this.setting.posterHeight,
        left: w,
        zIndex: Math.floor(this.posterItems.size()/2)   // 向下取整
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
