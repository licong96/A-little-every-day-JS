function Getfunction () {
  this.name = 'licong';
}

Getfunction.prototype.show = function () {
  console.log(this.name)
}

let obj = new Getfunction();

obj.show();

// js没被压缩
