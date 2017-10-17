;
function Li(a, b) {
  this.a = a
  this.b = b
};

Li.prototype.cong = function () {
  console.log(this.a, this.b)
};
