const webpack = require('webpack')
const log = require('./common/log')
const { ENV_CHINESE } = require('./common/const')
const { getEnv, checkDll } = require('./common/utils')

// 主进程
main()
async function main() {
  console.log(`当前环境配置为${ENV_CHINESE[getEnv()]}`)
  let webpackConfig = require('./webpack.prod')
  try {
    await checkDll()
    webpack(webpackConfig, (err, stats) => {
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')
      if (stats.hasErrors()) {
        log.error('构建时候出现错误')
        process.exit(1)
      }
      log.succes('构建完成')
    })
  } catch (err) {
    log.error(err)
  }
} 
