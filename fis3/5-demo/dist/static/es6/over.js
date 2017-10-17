define('static/es6/over.es6', function(require, exports, module) {

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _point = require('static/es6/point.es6');

var _point2 = _interopRequireDefault(_point);

var logger = document.getElementById('log');
logger.innerHTML = 'Good point: ' + new _point2['default'](1, 23);

});
