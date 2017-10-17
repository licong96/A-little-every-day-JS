define('static/es6/async.es6', function(require, exports, module) {

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _point = require('static/es6/point.es6');

var _point2 = _interopRequireDefault(_point);

exports['default'] = function () {
  var logger = document.getElementById('log');
  logger.innerHTML += '<br />Attached point: ' + new _point2['default'](Math.random() * 100 >> 0, Math.random() * 100 >> 0);
};

;
module.exports = exports['default'];

});
