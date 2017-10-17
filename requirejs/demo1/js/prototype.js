define(['jquery', 'validate'], function ($, validate) {

  function Li(a, b) {
    this.a = a
    this.b = b
  }

  Li.prototype.cong = function () {
    console.log(this.a, this.b)
  }

  console.log(validate.isEmpty(1, 2))

  return {
    Li: Li
  }

})
