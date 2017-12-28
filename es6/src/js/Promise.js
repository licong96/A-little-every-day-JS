{
  function timeout(bool) {
    return new Promise((resolve, reject) => {
      // setTimeout(resolve, ms, 'done');
      let data = '成功返回值'
      let error = '失败返回值'
      setTimeout(() => {
        if (bool) {
          resolve(data)
        } else {
          reject(error)
        }
      }, 2000)
    });
  }

  timeout(true).then((value) => {
    console.log(value);
  });
}


{
  // 方法
  const Util = (function () {
    // 拿到base64
    let fileLoad = function (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()

        reader.onload = function (file) {
          resolve(this.result)
        }
        reader.onerror = function () {
          reject(console.log('失败了'))
        }

        reader.readAsDataURL(file[0])
      })
    }
    // 得到图片
    let loadImageAsync = function (url) {
      return new Promise(function (resolve, reject) {
        const image = new Image();
          
        image.onload = function () {
          resolve(image);
        };
        image.onerror = function () {
          reject(new Error('Could not load image at ' + url));
        };

        image.src = url;      // 下面的会先执行
      });
    }

    return { fileLoad, loadImageAsync }
  })();
  
  let oFile = document.querySelector('#file');

  oFile.addEventListener('change', function (e) {
    let file = e.path[0].files
    console.log(file)

    // Util.fileLoad(file).then((res) => {
    //   console.log('res', res)       // 返回图片 base64
    // })

    Util.fileLoad(file).then((res) => {
      console.log('base64', res)             // 返回图片 base64
      return Util.loadImageAsync(res)     // 返回 img
    })
      .then((img) => {
        console.log('第二个then，接收第一个then的返回值', img)
      })
      .catch((error) => {
        console.log(error)
      })

    // 箭头函数简写
    // Util.fileLoad(file).then(
    //   res => Util.loadImageAsync(res)
    // ).then(
    //   img => console.log('第二个then，接收第一个then的返回值', img),
    //   err => console.log('reject', err)    // bad， 推荐用catch
    // )
  })
}

{
  // catch 捕获异常，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获
  const promise = new Promise(function (resolve, reject) {
    throw new Error('test');
  });
  promise.catch(function (error) {
    console.log(error);
  });
}