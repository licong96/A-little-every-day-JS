import './css/common.css';
import Layer from './components/layer/layer.js';

const App = function () {
  var dom = document.getElementById('app');
  var layer = new Layer();

  console.log(layer);

  dom.innerHTML = layer.tpl({
    name: '黎聪，可以同步刷新',
    arr: ['html', 'css', 'js', 'webpack', 'babel', 'ejs']
  })
}

new App();
