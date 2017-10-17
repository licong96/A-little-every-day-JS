var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口
  entry: {
    index: './src/js/index.js',
    about: './src/js/about.js'
  },
  // 出口
  output: {
    // path: path.resolve(__dirname, 'dist/js'),
    path: __dirname + '/dist',
    filename: 'js/[name].js'     // js/[name]-[chunkhash].js
    // publicPath: 'http://cdn.com/'   // 线上地址
  },
   // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',      // index-[hash].html
      template: 'src/index.html',
      // minify: {
      //   removeComments: true,       // 删除注释
      //   collapseWhitespace: true    // 删除空格
      // },
      hash: true,                   // 缓存清除
      chunks: ['index']            // 需要引入的js
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/about.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // },
      chunks: ['about']
    })
  ]
}
