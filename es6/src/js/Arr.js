{
  for (let index of ['1', 'c', 'ks'].keys()) {
    console.log(index)
  }
  // for (let value of ['1', 'c', 'ks'].values()) {
  //   console.log(value)
  // }
  for (let [index, value] of ['1', 'c', 'ks'].entries()) {
    console.log('entries', index, value)
  }
}

{
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
}

{
  // 查找
  console.log([1, 2, 3, 4, 5, 6].find(function (item) {     // 4 找第一个
    return item > 3
  }))
  console.log([1, 2, 3, 4, 5, 6].findIndex(function (item) {    // 3 找下标
    return item > 3
  }))
}

{
  console.log('number', [1, 2, 3, NaN].includes(1));      // true 是否存在
}