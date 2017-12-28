// Destructuring

console.log('数组解构')
{
  let [a, b] = [1, 2];
  console.log(a); // 1
  console.log(b); // 2
}

{
  let [a, b, ...rest] = [1, 2, 3, 4, 5, 6];
  console.log(a); // 1
  console.log(b); // 2
  console.log(rest);   // [3 4 5 6]
}

{
  let x;
  if ([1][0] === undefined) {
    x = f();
  } else {
    x = [1][0];
  }
  console.log('[1][0]', [1][0])
  console.log(x)
}

{
  let [a, b, c] = [1, 2];
  console.log(a)    // 1
  console.log(b)    // 2
  console.log(c)    // undefined  没有对应的值就是undefined
}
{
  let [a, b, c = 3] = [1, 2];
  console.log(a)    // 1
  console.log(b)    // 2
  console.log(c)    // 3    虽然没有，但是可以设置默认值
}

console.log('变量交换')
{
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(a)    // 2
  console.log(b)    // 1
}

{
  function fn() {
    return [1, 2]
  }
  let [a, b] = fn();
  console.log('结构函数返回值', a, b)      // 1, 2
}

{
  function fn() {
    return [1, 2, 3, 4, 5]
  }
  let [a, , , b] = fn();
  console.log('结构函数返回值自己想要的', a, b)      // 1, 4
}
{
  function fn() {
    return [1, 2, 3, 4, 5]
  }
  let [a, ...b] = fn();
  console.log('...返回一个数组', a, b)      // 1, [2, 3, 4, 5]
}

console.log('对象结构赋值------------')


{
  let { a, b } = { a: 1, b: 2 }
  console.log(a)  // 1
  console.log(b)  // 2
}
{
  let o = {
    p: 10,
    q: true
  }
  let {p, q} = o;
  console.log(p)   // 10
  console.log(q)   // true
}

{
  let {a = 10, b = 5} = {a: 3};     // 默认值被覆盖
  console.log(a, b)   // 3, 5
}

{
  let metaData = {
    title: 'abc',
    test: [{
      title: 'test',
      desc: 'description'
    }]
  }

  let {title: esTitle, test: [{title: cnTitle, desc: riDesc}]} = metaData   // 多层结构，格式要求严格

  console.log(esTitle, cnTitle, riDesc)     // bac, test, description
}

{
  const node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };
  
  let { loc, loc: { start }, loc: { start: { line, column } } } = node;
  console.log(loc)    // Object {start: Object}
  console.log(start)  // Object {line: 1, column: 5}
  console.log(line)    // 1
  console.log(column)  // 5
}