
define(function(require, exports){

  function init(obj) {
    startMove(obj, {width: 200, height: 600})

    window.bBtn = true;               // 打开
  }

  exports.init = init;

});
