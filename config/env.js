
module.exports = {
  LOCAL: {
    NODE_ENV: 'dev',
    PROCESS_ENV: 'dev',
    BASE_API: 'dev'
  },
  DEV: {
    NODE_ENV: 'production',
    PROCESS_ENV: 'dev',
    BASE_API: 'dev'
  },
  PROD: {
    NODE_ENV: 'production',
    PROCESS_ENV: 'prod',
    BASE_API: '1'
  },
  TEST: {
    NODE_ENV: 'production',
    PROCESS_ENV: 'test',
    BASE_API: '1'
  },
  GREY: {
    NODE_ENV: 'production',
    PROCESS_ENV: 'grey',
    BASE_API: '1'
  },
  PRE: {
    NODE_ENV: 'production',
    PROCESS_ENV: 'pre',
    BASE_API: '1'
  },
}
