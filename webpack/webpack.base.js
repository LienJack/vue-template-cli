const webpack = require('webpack')
const os = require('os')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin =require("add-asset-html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数
const { NODE_ENV } = require('./common/const')
const { resolvePath, getEnv } = require('./common/utils')
const ENV = require('../config/env.js')
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
          path: resolvePath('postcss.config.js')
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
  if (NODE_ENV  === 'production') {
    return [MiniCssExtractPlugin.loader].concat(loaders)
  } else {
    return ['vue-style-loader'].concat(loaders) // vue-style-loader热跟新
  }
}

module.exports = {
  entry: {
    app: [resolvePath('src/index.js')] // 入口
  },
  output: {
    // path: resolve('dist'), // 出口路径
    filename: '[name].[hash:10].js', // 输出文件名
    chunkFilename: "[id].[hash:10].js", // 公共代码
  },
  resolve: {
    extensions: ['.js', '.vue'], // 扩展名
    alias: {
      '@': resolvePath('src'),
      vue$: 'vue/dist/vue.esm.js'
    },
    modules: [resolvePath('node_modules')]
  },
  plugins: [
    // 清除之前打包的
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new CopyWebpackPlugin(
      [
        { from: resolvePath('src/static'), to: resolvePath('dist/static')}
      ]
    ),
       // 注入环境变量
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(ENV[getEnv()])
    }),
    // 进度条
    // new webpack.ProgressPlugin(),
    new ProgressBarPlugin(),
    new webpack.DllReferencePlugin({
      manifest: resolvePath('dll/vue.manifest.json'), // 引入的目标清单
      name: "vue", // dll的名称
      sourceType: "var"
    }),
    new webpack.DllReferencePlugin({
      manifest: resolvePath('dll/ui.manifest.json'), // 引入的目标清单
      name: "ui", // dll的名称
      sourceType: "var"
    }),
    new webpack.DllReferencePlugin({
      manifest: resolvePath('dll/vendor.manifest.json'), // 引入的目标清单
      name: "vendor", // dll的名称
      sourceType: "var"
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      // loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    // css抽离
    new MiniCssExtractPlugin({
      filename: `[name].css?[hash]`,
      chunkFilename: `[id].css?[hash]`
    }),
    new HtmlWebpackPlugin({
      template: resolvePath('src/index.html'),
      filename: 'index.html',
      minify: { // 优化
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 变成一行
        html5: true,
        preserveLineBreaks:false,
        minifyCSS:true,
        minifyJS:true,
        removeComments:false
      },
    }),
    // dll 引入
    new AddAssetHtmlPlugin({
      filepath: resolvePath('dll/vue.js'), // 需要添加的vue全家桶文件夹
      hash: true,
      typeOfAsset: "js",
      publicPath: './',
    }),
    new AddAssetHtmlPlugin({
      filepath: resolvePath('dll/ui.js'), // 需要添加的UI框架文件夹
      hash: true,
      typeOfAsset: "js",
      publicPath: './',
    }),
    new AddAssetHtmlPlugin({
      filepath: resolvePath('dll/vendor.js'), // 需要添加的第三方文件夹
      hash: true,
      typeOfAsset: "js",
      publicPath: './',
    }),
  ],
  module: {
    rules: [
      { 
        test: /\.vue$/, 
        use:[
          {
            loader: 'vue-loader',
            options: {
              hotReload: true // 热重载
            } 
          },
        ]
      },
      { 
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: /node_modules/,
        include:[resolvePath('src')]
      },
      { test: /\.css$/, use: styleLoaders() },
      { test: /\.scss$/, use: styleLoaders('scss') },
      { test: /\.less$/, use: styleLoaders('less') },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: resolvePath('src'),
        use: [
            {
                loader: 'url-loader',
                options: { 
                  limit: 20240,
                  outputPath: 'images/' 
                },
            },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]-[hash:5].min.[ext]',
          publicPath: 'fonts/',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name]-[hash:5].[ext]',
        }
      }
    ]
  },
}
