const { rootDir, PROCESS_ENV } = require('./const')
const path = require('path')
const  ENV = require('../../config/env.js')
const  { isProduction } = require('./const')
const log = require('./log')
const spawn = require("child_process").spawn;
const ora = require('ora')
const fs = require('fs')
const { execSync } = require('child_process');
function checkDll () {
  return new Promise((resolve, reject) => {
    const dllPath = resolvePath('dll')
    const manifest = resolvePath('dll/vue.manifest.json') // 只需要检测vue的dll就知道是否有安装dll了
    log.info('检测是否安装DLL')
    if (!(fs.existsSync(dllPath) && fs.existsSync(manifest))) {
      log.warn('还未编译DLL');
      downLoadDll()
        .then(()=>{resolve()})
        .catch(err => reject(err))
    }
    log.succes('DLL安装成功')
    resolve()
  })
}
/**
 * 下载DLL
 */
function downLoadDll() {
  return new Promise((resolve, reject) => {
    const spinner = ora(`安装DLL中.....`);
    spinner.start()
    let command = isProduction ? 'npm run build-dll' : 'npm run build-dll-dev'
    try {
      execSync(command)
      spinner.succeed()
      resolve()
    } catch (err) {
      spinner.fail()
      reject()
    }
    // 为何监听不了close事件
    // const status = spawn("npm.cmd",["run","build-dll"]);
    // status.stdout.on("data", data => {
    //   console.log(data.toString())
    // })
    // status.stdout.on("close", () => {
    //   console.log('end')
    //   spinner.succeed();
    //   log.succes("Dll安装成功:)");
    //   resolve();
    // })
  })
}
function resolvePath(dir) {
    return path.resolve(rootDir, dir)
  }
  // 用来检测是否存在这环境，没有返回默认值
function getEnv() {
    if (PROCESS_ENV in ENV) {
      return PROCESS_ENV
    } else {
      log.warn(`没有找到对应${PROCESS_ENV},已经自动切回默认环境`)
      return 'PROD'
    }
  }
module.exports = {
  resolvePath,
  getEnv,
  checkDll,
}