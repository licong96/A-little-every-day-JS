var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 入口
  entry: {
    index: './src/app.js'
  },
  // 出口
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].bundle.js'     // js/[name]-[chunkhash].js
  },
  // loader
  module: {
    loaders: [
      {
        test: /\.js$/,              // 所有js文件转换es5
        include: path.resolve(__dirname, 'src'),   // 指定这个文件夹
        exclude: path.resolve(__dirname, 'node_modules'),  // 排除这个文件夹
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.tpl$/,         // ejs模板
        loader: 'ejs-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'  // 从后到前
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'  //?importLoaders=1引入的css也用postcss处理加前缀
      },
      {   // 图片处理
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'assets/'
          }
        }, {
          loader: 'image-webpack-loader'    // 图片压缩
        }]
      }
    ]
  },
   // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
}
