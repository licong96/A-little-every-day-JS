alert("Hello, World");
function Getfunction () {
  this.name = 'lc';
}

Getfunction.prototype.show = function () {
  console.log(this.name)
}

let obj = new Getfunction();

obj.show();

// js没被压缩
