/**
 * @author lien
 * @create 2019.07.17
 * webpack-dev-server
 * 方便热跟新时候进行处理,可以参考
 * https://www.webpackjs.com/guides/hot-module-replacement/
 * 
 */
const log = require('./common/log')
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.local.js');
const { devServer } = require('./webpack.local')
webpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);
const compiler = webpack(webpackConfig);
const { checkDll } = require('./common/utils')
main()
async function main() {
  try {
    await checkDll()
    const server = new webpackDevServer(compiler, devServer);
    server.listen(devServer.port, devServer.host, () => {
      log.succes(`页面地址：${devServer.host}:${devServer.port}`);
    });
  } catch (err) {
    log.error(err)
  }
}

