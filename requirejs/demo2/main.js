require.config({
  paths: {
    'jquery': 'lib/jquery-2.2.2',
    'util': 'app/util'
  }
})

require(['jquery', 'util'], function ($, util) {
  $('body').css('background-color', 'red')
  util.fun()
})
