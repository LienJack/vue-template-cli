// 生产环境
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const CONFIG = require('../config/index.js')
const { getEnv, resolvePath } = require('./common/utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// node环境
module.exports = merge(base, {
  output: {
    path: CONFIG[getEnv()]['assetsRoot'] || path.resolve(__dirname, '../dist'),
    publicPath: CONFIG[getEnv()]['assetsPublicPath'] || '/'
  },
  mode: 'production',
  // devtool: CONFIG[getEnv()]['devtool'] || 'eval',
  stats: 'errors-only',
  plugins: [
    // new BundleAnalyzerPlugin(), // 打包分析
    new ParallelUglifyPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
      // sourceMap: true
    }),
     // 清除无用 css
     new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        resolvePath('src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        resolvePath('src/*.js')
      ])
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  
  // 有了dll分割的意义好像不大
  optimization: {
    splitChunks: { // 分割代码块
      chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
      minSize: 30000, // 最小尺寸，30000
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 5, // 最大异步请求数， 默认5
      maxInitialRequests : 3, // 最大初始化请求书，默认3
      automaticNameDelimiter: '~',// 打包分隔符
    cacheGroups: { // 缓存组
      // 需要测试
      vendor: {
      //   test: /node_modules/, // 把公共库抽离出来
      //   chunks: 'initial', // 从入口开始找
      //   minSize: 100, // 大小 
      //   minChunks: 2, // 最少抽离次数
      chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
      test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
      name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
      minSize: 30000,
      minChunks: 1,
      enforce: true,
      maxAsyncRequests: 5, // 最大异步请求数， 默认1
      maxInitialRequests : 3, // 最大初始化请求书，默认1
      reuseExistingChunk: true // 可设置是否重用该chunk
      },
      common: { // 公共模块
        minSize: 100, // 大小
        minChunks: 3, // 公用次数
        chunks: 'initial' // 从入口开始找
      }
    },
  }
},
});