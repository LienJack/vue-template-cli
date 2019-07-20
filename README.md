# OA
## 使用方法
进入项目运行
```
npm i
或者
cnpm i
或者
yarn install
```

本地开发
```
npm run build-dll-dev 安装DLL
npm run dev
```
打包
```
build-prod 生产线上
build-dev 开发环境
build-test 测试环境
build-grey 灰度测试
build-pre 预发布
```
文件目录
```
 '|-- OA_SYSTEM_WEB',
  '    |-- .babelrc',  babel配置
  '    |-- .browserslistrc', CSS浏览器兼容
  '    |-- .gitignore', git忽略名单
  '    |-- customize_prompt.js', 模板自定义（用于脚手架生成时候）
  '    |-- package.json', 
  '    |-- postcss.config.js', postCss配置
  '    |-- README.md', 文档说明
  '    |-- config', 配置文件
  '    |   |-- env.js', 不同环境全局变量配置
  '    |   |-- index.js', webpack自定义配置文件
  '    |-- dist', 打包后diam
  '    |-- dll', DLL加速包，默认没有。需要npm run build-dll 或者npm run build-dll-dev
  '    |   |-- ui.dll.js',
  '    |   |-- ui.manifest.json',
  '    |   |-- vendor.dll.js',
  '    |   |-- vendor.manifest.json',
  '    |   |-- vue.dll.js',
  '    |   |-- vue.manifest.json',
  '    |-- src', 主要入口

  '    |-- webpack',
  '        |-- devserver.js', webpack-dev-server 入口
  '        |-- dllConfig.js', DLL打包配置
  '        |-- index.js', webpack进程入口
  '        |-- webpack.base.js', 公用webpack配置
  '        |-- webpack.local.js', 本地开发webpack配置
  '        |-- webpack.prod.js', 打包webpack配置
  '        |-- common', webpack公用模块
  '            |-- const.js', 公用变量
  '            |-- log.js', 打印日志
  '            |-- utils.js', 工具函数
```

## 注意事项：
- 尽量提高代码的复用性
- 全局数据放到store里
- 重复性的可抽离到src/components
- 单个页面的直接在views/xxx/components

## 使用注意
DLL使用时候可能有以下问题
1. vue 调试工具无法使用
2. 第三方库使用出现问题  
可以在config/index 里面的isDll设置为false。然后把文件夹dll给删掉。

如果有比较大的第三方库，可以为其配置DLL

在config/index里面配置DllConfig

## BUG:  
[x] vue热跟新会刷新页面   
[x] DLL打包饿了么UI框架后，使用会出现问题   
[x] 无法自动检测是否有DLL  
[x] 代码分割失效，全部文件打包一起  
[x] 打包后第三方UI框架资源丢失


