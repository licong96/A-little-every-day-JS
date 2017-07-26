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
    this.closeBtn       = this.popupWin.find('p.lightbox-close-btn');     // 关闭按钮


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

  };

  // 原型方法
  LightBox.prototype = {
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
      });

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
                      '<span class="lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span>'+
                      '<img src="images/2-2.jpg" class="lightbox-image">'+
                      '<span class="lightbox-btn lightbox-next-btn lightbox-next-btn-show"></span>'+
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
