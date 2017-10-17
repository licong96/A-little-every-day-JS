requirejs.config({
  paths: {
    jquery: 'jquery-2.2.2'
  }
});

requirejs(['jquery', 'validate', 'prototype'], function($, validate, prototype) {
  // $('body').css('background-color', 'red')
  console.log(validate.isEmpty(4, 4))

  let li = new prototype.Li('黎', '聪')

  li.cong()
});
