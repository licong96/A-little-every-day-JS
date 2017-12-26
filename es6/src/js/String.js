
// 字符串方法
{
  let str = 'string'
  console.log('includes', str.includes('i'))    // true     是否包含某个字符
  console.log('start', str.startsWith('str'))   // true     是否在起始位置
  console.log('end', str.endsWith('ng'))   // true     是否在结束位置
}

{
  let str = 'abc'
  console.log(str.repeat(3))    // 字符串重复 3 次
}

{
  let name = 'list'
  let info = 'hello world'

  let m = `name: ${name}; info: ${info}`
  console.log('字符串模板：', m)
}

{
  console.log('1'.padStart(2, '0'))   //  01    不满两位前面补0
  console.log('1'.padEnd(2, '0'))     // 10     不满两位后面补0
}

{
  let user = {
    name: 'list',
    info: 'hello world'
  }

  console.log(abc`name：${user.name}; info：${user.info}`)

  function abc(s, v1, v2) {
    console.log(s)
    console.log(v1)
    console.log(v2)
    return s+v1+v2
  }
}