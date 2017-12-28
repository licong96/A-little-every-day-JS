
{
  // 判断一个值是不是有效的数
  console.log('15', Number.isFinite(15))      // true
  console.log('NaN', Number.isFinite(NaN))    // false

  console.log('NaN', Number.isNaN(NaN))       // true
  console.log('15', Number.isNaN(15))         // false
}

{
  // 判断是不是整数，参数必须是number类型
  console.log('25', Number.isInteger(25))        // true
  console.log('25.0', Number.isInteger(25.0))   // true
  console.log('25.1', Number.isInteger(25.1))   // false
}

{
  // 判断正数 0 负数
  console.log( Math.sign(-5) )    // -1
  console.log( Math.sign(0) )     // 0
  console.log( Math.sign(5) )     // 1
  console.log( Math.sign('5') )   // 1 字符串转成数字了
  console.log( Math.sign('str') )   // NaN
}

{
  console.log(Number.parseInt('12.34'))       // 12
  console.log(Number.parseFloat('123.45#'))   // 123.45

  console.log(Math.trunc(5.1))      // 4  去除一个数的小数部分，返回整数部分。
}