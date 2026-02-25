/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-02-24 13:24:14
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-02-25 14:29:55
 * @FilePath: \Vue_JavaScript\myvue_class01\my-first-vue\src\JS\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { watchFile } = require('fs');
const path = require('path');
const { text } = require('stream/consumers');
const { Static } = require('vue');
// 正确引入 webpack 插件：从 webpack 模块中解构出 ProvidePlugin
const { ProvidePlugin } = require('webpack');

module.exports = {
  // 入口文件（确认路径是你的 index.js 实际位置）
  entry: './index.js',
  // 输出配置
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // 打包前清空 dist 目录
  },
  mode: 'development',
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    static: path.resolve(__dirname, './'),
    watchFiles: ['./index.html', './index.js']
  },
  // 插件配置（修复构造函数问题）
  plugins: [
    // 正确创建 ProvidePlugin 实例（解决 jQuery 全局注入+环境问题）
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:['style-loader','css-loader', 'less-loader']
      }
    ],

  },
  // 解决 jQuery 浏览器环境问题的兜底配置
  externals: {
    jquery: 'window.jQuery'
  },
  resolve: {
    alias: {
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    }
  },
  // 方便调试（可选）
  devtool: 'inline-source-map'
};