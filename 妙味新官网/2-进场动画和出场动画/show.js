// 进场动画管理

define(function(require, exports){

  function show(aA, aDiv) {
    var firstHash = window.location.hash.substring(1) || 'index';    // substring 去掉第一个字符 ‘#’

    for (var i = 0; i < aDiv.length; i++) {
      aDiv[i].style.display = 'none'
      if (firstHash === aDiv[i].dataset.hash) {
        aDiv[i].style.display = 'block'

        // 进场动画
        switch(firstHash) {
          case 'index':
            require('animate/indexIn.js').init(aDiv[i])
          break;
          case 'student':
            require('animate/studentIn.js').init(aDiv[i])
          break;
          case 'message':
            require('animate/messageIn.js').init(aDiv[i])
          break;
        }
      }
    }

  }

  exports.show = show;

});
