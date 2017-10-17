export function tab(name, age) {
  this.name = name;
  this.age = age;
}

tab.prototype.show = function () {
  console.log(this.name, this.age)
}
