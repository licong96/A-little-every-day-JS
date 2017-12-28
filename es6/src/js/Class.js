{
  // 构造函数的方式
  function Point (x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return `(${this.x}, ${this.y})`;
  };

  let p = new Point(1, 2)

  console.log(p.toString())   // (1, 2)
}

{
  // 上面代码改成es6的class
  // 定义类
  class Point {
    constructor (x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return `(${this.x}, ${this.y})`;
    }
  }

  let p1 = new Point(1, 2)

  let p2 = new Point(3, 4)

  console.log(p1.toString())   // (1, 2)
  console.log(p2.toString())   // (3, 4)

  console.log(p1.__proto__ === p2.__proto__)    // true
}

{
  // 继承
  class Point {
    constructor (x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return `(${this.x}, ${this.y})`;
    }
  }

  let p1 = new Point(1, 2)
  console.log(p1.toString())   // (1, 2)

  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y)     // 调用父类的constructor(x, y)
      this.color = color
    }

    toString() {
      return this.color + '---' + super.toString()
    }
  }

  let color = new ColorPoint('2', '3', 'white')

  console.log(color.toString())
}