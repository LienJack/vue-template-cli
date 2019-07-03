const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(), // 打包分析
  ],
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        vendor: {
          test: /node_modules/, // 把公共库抽离出来
          chunks: 'initial', // 从入口开始找
          minSize: 100, // 大小 
          minChunks: 2, // 最少抽离次数
        },
        common: { // 公共模块
          minSize: 100, // 大小
          minChunks: 2, // 公用次数
          chunks: 'initial' // 从入口开始找
        }
      },
    }
  },
});