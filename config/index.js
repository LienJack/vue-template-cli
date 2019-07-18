/**
 * 自定义配置
 */
'use strict'
const path = require('path')
const common = {
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsPublicPath: './',
  devtool: 'source-map',
}
module.exports = {
  ENV: {
    LOCAL: 'LOCAL', // 本地开发
    DEV: 'DEV', // 开发环境
    TEST: 'TEST', // 测试环境
    PROD: 'PROD', // 生产环境
    GREY: 'GREY', // 灰度环境
    PRE: 'PRE', // 预发布环境
  },
  ENV_CHINESE: {
    LOCAL: '本地开发', // 本地开发
    DEV: '开发环境', // 开发环境
    TEST: '测试环境', // 测试环境
    PROD: '生产环境', // 生产环境
    GREY: '灰度环境', // 灰度环境
    PRE: '预发布环境', // 预发布环境
  },
  LOCAL: {
    assetsPublicPath: '/', // 资源公共路径
    assetsRoot: path.resolve(__dirname, '../dist'), //打包文件名
    host: 'localhost', // 域名
    port: 8000, // 端口
    autoOpenBrowser: true, // 是否打开浏览器
    hot: true, // 是否热跟新
    proxy: {

    }
  },
  PROD: {
    ...common,
    devtool: 'eval',
  },
  DEV: {
    ...common
  },
  TEST: {
    ...common
  },
  GREY: {
    ...common,
    assetsPublicPath: './grey',
  },
  PRE: {
    ...common,
  },
}
