const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import');
const pxtorem = require('postcss-pxtorem')
const webpack = require('webpack')
// 兼容性CSS的自动补全
module.exports = {
  plugins: [
    autoprefixer(), // 兼容性CSS的自动补全
    postcssPresetEnv(), //postcssPresetEnv可以让你写CSS4的语言
    postcssImport({ addDependencyTo: webpack }), // 在@import css文件的时候让webpack监听并编译
  ]
}