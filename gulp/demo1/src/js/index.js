
function Licong(name, age) {
  this.name = name;
  this.age = age;
}

Licong.prototype.show = function () {
  // console.log(`传入的名字是：${this.name}，年龄是：${this.age}`);
  console.log(this.name, this.age);
};

var lc = new Licong('黎聪', 20);

lc.show();

// let a = 5;
//
// for (let i = 0; i < a; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 100)
// }
