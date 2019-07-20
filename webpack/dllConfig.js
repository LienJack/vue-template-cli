const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数
const dllDir = "../dll"
const { DllConfig } = require('../config/index')
const { isProduction } = require('./common/const')
const configDll = {
  // 当环境为production，DLL打包出来的vue是没有调试工具，所以要做环境判断
  mode: isProduction ? 'production': 'development',
  entry: {
    ...DllConfig
  },
  output: {
    filename: '[name].dll.js', // 产生的文件名
    path: path.resolve(__dirname, dllDir), 
    library: '[name]', 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=dll',
      }
    ],
  },
  // 饿了么里面引用了vue，需要定义vue的引用包
  resolve: {
    alias: {
        vue$: 'vue/dist/vue.esm.js'
      },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new ProgressBarPlugin(),
    new webpack.DllPlugin({ 
      name: '[name]',
      path:path.resolve(__dirname, dllDir, '[name].manifest.json') // 任务清单
    }),
    new HappyPack({
      id: 'dll',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ]
}
module.exports = configDll
