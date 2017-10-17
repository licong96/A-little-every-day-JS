import './layer.scss';
import tpl from './layer.tpl'

console.log(tpl);

function Layer() {
  return {
    name: 'layer',
    tpl: tpl
  };
}

export default Layer;
