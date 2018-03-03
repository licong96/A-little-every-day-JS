
define(function(require, exports){

  function init(obj) {
    startMove(obj, {width: 800, height: 200})

    window.bBtn = true;               // 打开
  }

  exports.init = init;

});
