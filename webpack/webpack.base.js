const path = require("path")
const fs = require("fs")
const webpack = require('webpack')
// const CleanWebpackPlugin = require("clean-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin =require("add-asset-html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数
const rootDir = path.resolve(__dirname, '../'); // 根目录
const resolve = dir => path.resolve(rootDir, dir)
const env = process.env.NODE_ENV;
/**
 * css的load处理
 * @param {String} lang less，scss
 */
function styleLoaders (lang) {
  const loaders = [
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: resolve('postcss.config.js')
        }
      }
    }
  ]
  if (lang === 'scss') {
    loaders.push({
      loader: 'sass-loader',
      options: {
        indentedSyntax: false,
      }
    })
  }
  if (lang === 'less') {
    loaders.push({
      loader: 'less-loader',
    })
  }
  if (env === 'production') {
    return [MiniCssExtractPlugin.loader].concat(loaders)
  } else {
    return ['vue-style-loader'].concat(loaders) // vue-style-loader热跟新
  }
}


module.exports = {
  entry: {
    app: ["@babel/polyfill",resolve('src/index.js')] // 入口
  },
  output: {
    path: resolve('dist'), // 出口路径
    filename: '[name].[hash:10].js', // 输出文件名
    chunkFilename: "[id].[hash:10].js", // 公共代码
  },
  resolve: {
    extensions: ['.js', '.vue'], // 扩展名
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        { from: resolve('src/static'), to: resolve('dist/static')}
      ]
    ),
    new webpack.DllReferencePlugin({
      manifest: resolve('dll/manifest.json'), // 引入的目标清单
      name: "dll", // dll的名称
      sourceType: "var"
    }),
    new VueLoaderPlugin(),
    // 环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV" : JSON.stringify(process.env.NODE_ENV)
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    // css抽离
    new MiniCssExtractPlugin({
      filename: `[name].css?[hash]`,
      chunkFilename: `[id].css?[hash]`
    }),
    // dll 引入
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
      minify: { // 优化
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 变成一行
      },
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve('dll/dll.js'), // 需要添加的dll文件夹
      hash: true,
      typeOfAsset: "js",
      publicPath: './',
    }),
  ],
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { 
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: styleLoaders() },
      { test: /\.scss$/, use: styleLoaders('scss') },
      {
        test: /\.(png|jpg|jpeg)$/,
        include: resolve('src'),
        use: [
            {
                loader: 'url-loader',
                options: { limit: 20240 },
            },
            { loader: 'img-loader' },
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
        chunks: "all",
    },
},
}