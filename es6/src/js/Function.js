
{
  function log(x, y = 'World') {    // 默认参数的条件是 undefined
    console.log(x, y);
  }
  
  log('Hello')  // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '')  // Hello
  log('Hello', NaN) // Hello NaN
}

{
  // 写法一
  function m1({ x = 0, y = 0 } = {}) {
    return [x, y];
  }

  // 写法二
  function m2({ x, y } = { x: 0, y: 0 }) {
    return [x, y];
  }

  console.log(m1())
  console.log(m2())
}

{
  var x = 1;
  function foo(x, y = function () { x = 2; }) {
    x = 3;
    y();
    console.log(x);
  }

  foo() // 2
  console.log(x) // 1
}

{
  function push(array, ...items) {
    items.forEach(function (item) {
      array.push(item);
      console.log(item);    // 1, 2, 3
    });
    console.log(array)      // [1, 2, 3]
  }

  var a = [];
  push(a, 1, 2, 3)
}