const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: 7777,
    host: 'localhost',
    hot: true,
    compress: true,
    progress: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ]
})