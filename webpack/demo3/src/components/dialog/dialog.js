// 加载模块css
require('./css/dialog.scss')
// 加载模板
var html = require('./tmpl/dialog.html')

/* eslint-disable no-undef */
module.exports = function () {
  console.log(html);
  var $dialog = $(html).clone()
  console.log($dialog);
  $dialog.find('.close').on('click', function () {
    $dialog.fadeOut(function () {
      $(this).remove()
    })
  })
  $('body').append($dialog)
  $dialog.fadeIn()
}
