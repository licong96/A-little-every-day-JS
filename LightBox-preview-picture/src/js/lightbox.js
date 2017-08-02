;(function($) {
  var LightBox = function() {
    var self = this;

    // 创建遮罩和弹出框
    this.popupMask = $('<div id="G-lightbox-mask">');
    this.popupWin = $('<div id="G-lightbox-popup">');

    // 保存body
    this.bodyNode = $(document.body);

    // 渲染剩余的DOM，并且插入到body
    this.renderDOM();

    this.picViewArea  = this.popupWin.find('div.lightbox-pic-view');        // 大图预览区域
    this.popupPic     = this.popupWin.find('img.lightbox-image');          // 图片
    this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption');  // 图片描述区域
    this.nextBtn        = this.popupWin.find('span.lightbox-next-btn');    // 下一张
    this.prevBtn        = this.popupWin.find('span.lightbox-prev-btn');    // 上一张

    this.captionText    = this.popupWin.find('p.lightbox-pic-desc');      // 图片描述
    this.currentIndex   = this.popupWin.find('span.lightbox-of-index');   // 图片当前索引
    this.closeBtn       = this.popupWin.find('.lightbox-close-btn');     // 关闭按钮


    // 准备开发时间委托，获取组数据
    // delegate事件处理程序适用于当前或未来的元素

    this.groupName = null;        // 点击的组名
    this.groupData = [];          // 放置同一组数据

    this.bodyNode.delegate('.js-lightbox, *[data-role=lightbox]', 'click', function(e) {
      e.stopPropagation();
      var currentGroupName = $(this).attr('data-group')

      if (currentGroupName !== self.groupName) {      // 相同组名只执行一次
        self.groupName = currentGroupName;
        // 根据当前组名获取同一组数据
        self.getGroup()
      }

      // 初始化弹出
      self.initPopup($(this));
    });

    // 关闭弹出
    this.popupMask.click(function () {
    	$(this).fadeOut();
    	self.popupWin.fadeOut()
      	self.clear = false
    })
    this.closeBtn.click(function() {
    	self.popupMask.fadeOut()
    	self.popupWin.fadeOut()
      	self.clear = false
    })

    // 鼠标经过显示隐藏切换按钮
    this.flag = true		// 标识
    this.nextBtn.hover(function() {
    	if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
    		$(this).addClass('lightbox-next-btn-show')
    	}
    }, function() {
    	if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
    		$(this).removeClass('lightbox-next-btn-show')
    	}
    }).click(function(e) {
    	if (!$(this).hasClass('disabled') && self.flag) {
    		e.stopPropagation();
    		self.flag = false
    		self.goto('next');
    	}
    })

    this.prevBtn.hover(function() {
    	if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
    		$(this).addClass('lightbox-prev-btn-show')
    	}
    }, function() {
    	if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
    		$(this).removeClass('lightbox-prev-btn-show')
    	}
    }).click(function(e) {
    	if (!$(this).hasClass('disabled') && self.flag) {
    		e.stopPropagation();
    		self.flag = false
    		self.goto('prev');
    	}
    })

    // 窗口调整大小
    var timer = null
    this.clear = false

    $(window).resize(function () {
    	if (self.clear) {
    		window.clearTimeout(timer)
	    	timer = window.setTimeout(function() {
				self.loadPicSize(self.groupData[self.index].src)
			}, 500)
    	}
    })

  };

  // 原型方法
  LightBox.prototype = {
  	goto: function(dir) {		// 切换
  		if (dir === 'next') {
  			this.index++
  			if (this.index >= this.groupData.length - 1) {
  				this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show')
  			}
  			if (this.index != 0) {
  				this.prevBtn.removeClass('disabled')
  			}

  			var src = this.groupData[this.index].src
  			this.loadPicSize(src)

  		} else if (dir === 'prev') {
  			this.index--
  			if (this.index <= 0) {
  				this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show')
  			}
  			if (this.index != this.groupData.length - 1) {
  				this.nextBtn.removeClass('disabled')
  			}
  			var src = this.groupData[this.index].src
  			this.loadPicSize(src)
  		}
  	},
    // 显示图片预览
    showMaskAndPopup: function(src, id) {
      // console.log(src, id)
      var self = this;

      // 先隐藏
      this.popupPic.hide();
      this.picCaptionArea.hide();

      // 遮罩层显示
      this.popupMask.fadeIn();

      // 获取window的宽高
      var winWidth = $(window).width(),
          winHeight = $(window).height();

      // 设置预览区域的宽高
      this.picViewArea.css({
        width: winWidth / 2,
        height: winHeight / 2
      });

      // 显示预览
      this.popupWin.fadeIn();

      var viewHeight = winHeight / 2 + 10
      this.popupWin.css({
        width: winWidth / 2 + 10,
        height: winHeight / 2 + 10,
        marginLeft: -(winWidth / 2 + 10)/2,
        top: -viewHeight
      }).animate({
        top: (winHeight - viewHeight) / 2
      }, function() {
        // 加载图片
        self.loadPicSize(src)
      });

      // 根据当前点击的元素ID获取在当前组别里面的索引
      this.index = this.getIndexOf(id)
      // console.log(this.index)

      // 上下切换按钮显示隐藏
      if (this.groupData.length > 1) {
        if (this.index === 0) {
          this.prevBtn.addClass('disabled')
          this.nextBtn.removeClass('disabled')
        } else if (this.index === this.groupData.length - 1) {
          this.nextBtn.addClass('disabled')
          this.prevBtn.removeClass('disabled')
        } else {
          this.nextBtn.removeClass('disabled')
          this.prevBtn.removeClass('disabled')
        }
      }
    },
    loadPicSize: function (src) {   // 加载图片大小
      var self = this;
      self.popupPic.css({
      	width: 'auto',
      	height: 'auto'
      }).hide()

      self.picCaptionArea.hide();

      this.preLoadImg(src, function () {
        console.log('图片加载完成')
        self.popupPic.attr('src', src)
        var picWidth = self.popupPic.width(),
            picHeight = self.popupPic.height()

        console.log(picWidth, picHeight)
        self.changePic(picWidth, picHeight)
      })
    },
    changePic: function (width, height) {    // 设置图片宽高
      var self = this,
      		winWidth = $(window).width(),
      		winHeight = $(window).height()

      // 如果图片的宽高大于浏览器可视区，等于视口比例
      var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1)

      width = width * scale
      height = height * scale

      this.picViewArea.animate({
        width: width - 10,
        height: height - 10
      });
      this.popupWin.animate({
        width: width,
        height: height,
        marginLeft: -(width / 2),
        top: (winHeight - height) / 2
      }, function () {
      	self.popupPic.css({
      		width: width - 10,
      		height: height - 10
      	}).fadeIn()
      	self.picCaptionArea.fadeIn()
      	self.flag = true
      	self.clear = true
      })

      // 设置文字描述
      this.captionText.text(this.groupData[this.index].caption)
      this.currentIndex.text('当前索引：' + (this.index + 1) + ' or ' + this.groupData.length)
    },
    preLoadImg: function (src, callback) {    // 判断图片是否加载完成
      var img = new Image();
      if (!!window.ActiveXObject) {   // IE
        img.onreadystatechange = function () {
          if (this.readyState == "complete") {
            callback()
          }
        }
      } else {
        img.onload = function () {
          callback()
        }
      }
      img.src = src
    },
    getIndexOf: function (currentId) {   // 获取ID
      var index = 0;

      $(this.groupData).each(function(i) {
        index = i;
        if (this.id === currentId) {
          return false
        }
      });

      return index;
    },
    // 获取当前点击图的src和id
    initPopup: function(curentOjb) {
      console.log(curentOjb)    // 点击的当前图片

      var self = this,
          sourceSrc = curentOjb.attr('data-source'),
          currentId = curentOjb.attr('data-id');

      this.showMaskAndPopup(sourceSrc, currentId);
    },
    // 获取一组
    getGroup: function() {
      var self = this;

      // 根据当前的组别名称获取页面中所有相同的组别的对象
      var groupList = this.bodyNode.find('*[data-group='+this.groupName+']');
      // console.log(groupList)

      // 循环出每一个的数据，push到groupData
      self.groupData.length = 0;
      groupList.each(function () {
        self.groupData.push({
          src: $(this).attr('data-source'),
          id: $(this).attr('data-id'),
          caption: $(this).attr('data-caption')
        })
      })
      console.log(self.groupData)
    },
    // 创建结构
    renderDOM: function() {
      var strDom = '<div class="lightbox-pic-view">'+
                      '<span class="lightbox-btn lightbox-prev-btn"></span>'+
                      '<img src="images/2-2.jpg" class="lightbox-image">'+
                      '<span class="lightbox-btn lightbox-next-btn"></span>'+
                    '</div>'+
                    '<div class="lightbox-pic-caption">'+
                      '<div class="lightbox-caption-area">'+
                        '<p class="lightbox-pic-desc"></p>'+
                        '<span class="lightbox-of-index">当前索引：0 of 0</span>'+
                      '</div>'+
                      '<div class="lightbox-close-btn"></div>'+
                    '</div>';

      // 插入到this.popupWin弹出框
      this.popupWin.html($.trim(strDom));
      // 把遮罩和弹出框插入body
      this.bodyNode.append(this.popupMask, this.popupWin);
    }

  };

  window['LightBox'] = LightBox;
})(jQuery);
