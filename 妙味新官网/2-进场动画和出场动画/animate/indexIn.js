// 管理index页面动画

define(function(require, exports){

  function init(obj) {
    startMove(obj, {width: 400, height: 400})

    window.bBtn = true;               // 打开
  }

  exports.init = init;

});
