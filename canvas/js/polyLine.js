var PolyLine = function (name, cfg) {
  $(name).css(cfg.css);
  
  var w = cfg.width;
  var h = cfg.height;

  // 加入画布-网格
  var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;

  // 水平网格线 100份 -> 10份
  var stepX = 10;
  var stepY = cfg.data.length + 1;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#999';

  window.ctx = ctx;

  // 水平线
  for (var i = 0; i <= stepX; i++) {
    var y = (h / stepX) * i;
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }

  // 垂直线
  var text_w = (w / 2 / stepY) * 1
  for (var i = 0; i <= stepY; i++) {
    var x = (w / stepY) * i;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);

    // 添加名称
    if (cfg.data[i]) {
      var text = $('<div class="text">');
      text.text(cfg.data[i][0]);
      text.css({ width: text_w, left: x/2 + (text_w/2)})
      $(name).append(text);
    }
  }

  ctx.stroke();
  $(name).append(cns);


  // 加入画布-数据
  var cns2 = document.createElement('canvas');
  var ctx2 = cns2.getContext('2d');
  cns2.width = ctx2.width = w;
  cns2.height = ctx2.height = h;

  // 动画函数
  var animation = function (pire) {
    // 动画开始前先清除画布
    ctx2.clearRect(0, 0, w, h);

    // 绘制折线是数据
    ctx2.beginPath();
    ctx2.lineWidth = 3;
    ctx2.strokeStyle = '#ff8888';

    var zx = 0;
    var zy = 0
    var row_w = (w / stepY);
    var row_h = h * (1 - cfg.data[0][1]);

    // 画点
    for (var i = 0; i < cfg.data.length; i++) {
      zx = row_w * i + row_w;
      zy = h * (1 - cfg.data[i][1] * pire);      // 1- 小数，可以调换顺序

      ctx2.moveTo(zx, zy);
      ctx2.arc(zx, zy, 5, 0, 2 * Math.PI);
    }

    // 连线
    ctx2.moveTo(row_w, h * (1 - cfg.data[0][1] * pire));   // 起始位置
    for (var i = 0; i < cfg.data.length; i++) {
      zx = row_w * i + row_w;
      zy = h * (1 - cfg.data[i][1] * pire);

      ctx2.lineTo(zx, zy)
    }

    ctx2.lineWidth = 1;

    // 绘制阴影
    // ctx2.lineTo(0, h);
    ctx2.lineTo(row_w*cfg.data.length, h);
    ctx2.lineTo(row_w, h);
    ctx2.fillStyle = 'rgba(255, 136, 120, 0.37)';
    ctx2.fill();
    
    // 写数据
    for (var i = 0; i < cfg.data.length; i++) {
      var item = cfg.data[i]
      zx = row_w * i + row_w;
      zy = h * (1 - cfg.data[i][1] * pire);

      ctx2.fillStyle = item[2] ? item[2] : '#333';
      ctx2.fillText( ((item[1] * 100) * pire >> 0 ) + '%', zx - 10, zy - 10)
    }

    ctx2.stroke();
    $(name).append(cns2);
  }

  // animation(1);
  var ISNo = false
  var s = 0;

  document.addEventListener('click', function () {
    for (var i = 0; i < 100; i++) {
      setTimeout(function () {
        ISNo ? s += 0.01 : s -= 0.01;
        if (s > 1) {
          s = 1
        } else if (s < 0) {
          s = 0
        }
        animation(s)
      }, i * 17)
    }
    ISNo = !ISNo;
  },false)

}
