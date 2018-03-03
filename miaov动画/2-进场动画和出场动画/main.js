
define(function(require, exports) {

  // 初始化js
  // require('logo.js').init();        // logo
  // require('menu.js').init();        // 菜单
  // require('foot.js').init();        // 底部

  var aA = document.getElementsByClassName('li');
  var aDiv = document.getElementsByClassName('div');

  // hash改变事件，点击的时候不刷新页面
  window.bBtn = true;
  window.onhashchange = function () {
    if (window.bBtn) {
      window.location.reload()
    }
  }

  require('show.js').show(aA, aDiv);

  require('hide.js').hide(aA, aDiv);

});
