import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  return config
})

// response拦截器
service.interceptors.response.use(
  response => {
    return response.data
  }
)

export default service
