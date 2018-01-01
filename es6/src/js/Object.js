{
  let o = 1
  let b = '2'
  let j = true

  let obj = {
    o,
    b,
    j,
    fn() {
      console.log(this.o)
    }
  }
  console.log(obj)
  obj.fn()      // 1
}

{
  // 拷贝
  console.log(Object.assign({a: 'a'}, {b: 'b'}))
}

{
  // 遍历
  let obj = {o: 123, b: '456'}
  for (let [key, value] of Object.entries(obj)) {
    console.log(key, value)     // o 123  b 456
  }
}

{
  let item = {t: 1}
  let obj = {}

  // 增
  console.info(obj['t'] = 1)    // {t: 1}

  // 查
  console.info('t' in obj)

  // 改
  let t = 't'
  console.info(obj[t] = 2)

  // 删
  console.info(delete obj['t'], obj)
}