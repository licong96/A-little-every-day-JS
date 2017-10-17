import "../css/lib/reset.css";
import "../css/page/detailed.scss";

import Layer from '../components/layer/layer.js';


$(function() {
  var layer = new Layer();

  console.log(layer);

  $('footer').html(layer.tpl({
    name: '改变',
    arr: ['html', 'css', 'js', 'webpack', 'babel', 'ejs']
  }))

  $('body').css('background', '#ddd')
})
