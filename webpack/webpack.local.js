// 本地开发
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config/index')
const base = require('./webpack.base.js')
module.exports = merge(base, {
  output: {
    path: config.LOCAL.assetsRoot, // 出口路径
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    overlay: {
      errors: true,
      warnings: true
    },
    contentBase: config.LOCAL.assetsRoot,
    port: config.LOCAL.port,
    host: config.LOCAL.host,
    // open: config.LOCAL.autoOpenBrowser,
    open: true,
    hot: true,
    inline: true,
    compress: true,
    progress: true,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    // 代理到后端的服务地址，会拦截所有以api开头的请求地址
    proxy: config.LOCAL.proxy,
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化后等300ms再去执行动作
      aggregateTimeout: 300,
      // 默认每秒询问1000次
      poll: 1000
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ]
})
