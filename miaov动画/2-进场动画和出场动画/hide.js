// 出场动画管理

define(function(require, exports){

  function hide(aA, aDiv) {
    // 点击切换事件
    for (var i = 0; i< aA.length; i++) {
      aA[i].onclick = function () {
        var hash = this.dataset.hash;      // 获取事件hash，也就是目标hash

        window.bBtn = false;               // 不刷新
        // window.location.hash = hash;    // 出场动画结束后修改hash

        switch(window.location.hash.substring(1) || 'index') {
          case 'index':
            require('animate/indexOut.js').init(aA, aDiv, hash);
          break;
          case 'student':
            require('animate/studentOut.js').init(aA, aDiv, hash);
          break;
          case 'message':
            require('animate/messageOut.js').init(aA, aDiv, hash);
          break;
        }
      }
    }
  }

  exports.hide = hide;

});
