const path = require('path')
const webpack = require('webpack')
const { dependencies }  = require("../package.json") ;
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数
const rootDir = path.resolve(__dirname, '../'); // 根目录
const resolve = dir => path.resolve(rootDir, dir)
const dllDir = "../dll"
module.exports = {
  mode: 'development',
  entry: {
    dll: (Object.keys(dependencies || {}))
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
        exclude: /node_modules/,
        include: resolve('src')
      }
    ],
  },
  plugins: [
    new webpack.DllPlugin({ // name == library
      name: '[name]',
      path:path.resolve(__dirname, dllDir, 'manifest.json') // 任务清单
    }),
    new HappyPack({
      id: 'dll',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ]
}