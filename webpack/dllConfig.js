const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数
const dllDir = "../dll"
module.exports = {
  mode: 'production',
  entry: {
    // dll: (Object.keys(dependencies || {})) // 这方法当然好，但是出现打包依赖关系错乱
    // 有可能会出现打包依赖问题，所以dll需要分开
    vue: ['vue', 'vue-router', 'vuex', 'axios'], // vue全家桶
    ui: ['element-ui'],
    vendor: ['loadsh'],
  },
  output: {
    filename: '[name].js', // 产生的文件名
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
    new webpack.DllPlugin({ // name == library
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