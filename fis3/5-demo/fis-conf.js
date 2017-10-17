// 加 md5
fis.match('*.{js,css,png}', {
  useHash: false
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

// 代码压缩
fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});


// 启用 es6-babel 插件，解析 .es6 后缀为 .js
fis.match('*.es6', {
  rExt: '.js',
  parser: fis.plugin('es6-babel')
});

// 开启模块化开发
fis.hook('module');
fis.match('*.es6', {
  isMod: true
});


// 基于整个项目打包
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

// sass
fis.match('*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});

fis.match('*.{scss, css}', {
  packTo: '/static/css/aio.css'
});

fis.match('*.js', {
  packTo: '/static/js/aio.js'
});
