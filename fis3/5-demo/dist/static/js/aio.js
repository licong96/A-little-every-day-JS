;/*!static/js/main.js*/
var is=isEmpty(4,4);console.log(is);var li=new Li("黎","聪");li.cong();
;/*!static/js/prototype.js*/
function Li(i,o){this.a=i,this.b=o}Li.prototype.cong=function(){console.log(this.a,this.b)};
;/*!static/js/validate.js*/
function isEmpty(n,t){return n+t}