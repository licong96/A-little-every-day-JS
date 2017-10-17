import "../css/lib/reset.css";
import "../css/common/grid.scss";
import "../css/page/index.scss";

// import $ from 'jquery'
// import dialog from '../components/dialog/dialog.js';

import Layer from '../components/layer/layer.js';


$(function() {
  var layer = new Layer();

  console.log(layer);

  $('footer').html(layer.tpl({
    name: '黎聪，可以同步刷新',
    arr: ['html', 'css', 'js', 'webpack', 'babel', 'ejs']
  }))

  $('.main').on('click', function () {
    // dialog();
  })
  $('body').css('background', '#f5f5f5')
})
