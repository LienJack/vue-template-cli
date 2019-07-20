// 生产环境
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CONFIG = require('../config/index.js')
const { isShowAnalyzer } = require('../config/index')
const { getEnv, resolvePath } = require('./common/utils')
// node环境
const prodConfig = merge(base, {
  output: {
    path: CONFIG[getEnv()]['assetsRoot'] || path.resolve(__dirname, '../dist'),
    publicPath: CONFIG[getEnv()]['assetsPublicPath'] || '/'
  },
  mode: 'production',
//   devtool: CONFIG[getEnv()]['devtool'] || 'eval',
  stats: 'errors-only',
  plugins: [
    new ParallelUglifyPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    
  ],
  
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
if (isShowAnalyzer) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = prodConfig
