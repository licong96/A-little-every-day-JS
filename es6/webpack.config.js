var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  // 入口
  entry: {
    index: './src/js/index.js'
  },
  // 出口
  output: {
    path: __dirname + '/dist',
    publicPath: '/',       // 模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js'     // js/[name]-[chunkhash].js
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
        // loader: 'html-loader'
        loader: 'html-loader?attrs=img:src img:data-src'
      },
      {
        test: /\.tpl$/,         // ejs模板
        loader: 'ejs-loader',
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'  //?importLoaders=1引入的css也用postcss处理加前缀
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true?importLoaders=1', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        // loader: 'style-loader!css-loader!postcss-loader!sass-loader'  // 从后到前
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'sass-loader']
        })
      },
      {
        // 图片加载器，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: './images/[name].[hash:7].[ext]',
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader'    // 图片压缩
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
   // 插件
  plugins: [
    new FriendlyErrorsWebpackPlugin(),    // 可以识别某些类别的webpack错误并进行清理
    // new UglifyJSPlugin(),     // js压缩
    // new ExtractTextPlugin('css/[name].css'),  // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    // HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      filename: './index.html', // 生成的html存放路径，相对于path
      template: './src/view/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, // 为静态资源生成hash值
      chunks: ['index'] // 需要引入的chunk，不配置就会引入所有页面的资源
      // minify: { // 压缩HTML文件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true // 删除空白符与换行符
      //   removeAttributeQuotes: true
      // }
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    inline: true,
    quiet: true,    // 开启错误提示
    port: 8083
  }
}
