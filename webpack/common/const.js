const path = require('path')
module.exports = {
  rootDir: path.resolve(__dirname, '../../'), // 根目录
  PROCESS_ENV: JSON.parse(JSON.stringify(process.env.PROCESS_ENV)), // 环境变量
  NODE_ENV: JSON.parse(JSON.stringify(process.env.NODE_ENV)), // node环境
  ENV_CHINESE: {
    LOCAL: '本地开发', // 本地开发
    DEV: '开发环境', // 开发环境
    TEST: '测试环境', // 测试环境
    PROD: '生产环境', // 生产环境
    GREY: '灰度环境', // 灰度环境
    PRE: '预发布环境', // 预发布环境
  },
}