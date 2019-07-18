// 配置选项
module.exports = [
  {
    type: "confirm",
    name: "mobile",
    message: "是否用于移动端？"
  },
  {
    type: "confirm",
    name: "flexible",
    message: "是否使用移动端适配？",
    when: function (answers) {
      return answers.mobile
    }
  },
  {
    type: "confirm",
    name: "polyfill",
    message: "是否兼容安卓4.4.0？",
    when: function (answers) {
      return answers.mobile
    }
  },
  {
    type: "confirm",
    name: "weixin",
    message: "是否使用配置微信？",
    when: function (answers) {
      return answers.mobile
    }
  },
  {
    type: "confirm",
    name: "vux",
    message: "是否使用vux？"
  },{
    type: "checkbox",
    name: "env",
    message: "选择要配置的环境",
    choices: [
      {
        name: 'dev',
        message: '开发环境',
        checked: true
      }, {
        name: 'pro',
        message: '生产环境环境',
        checked: true
      }, {
        name: 'test',
        message: '测试环境',
        checked: true
      }, {
        name: 'grey',
        message: '灰度环境',
      }, {
        name: 'pre',
        message: '预发布环境'
      }
    ]
  }
]