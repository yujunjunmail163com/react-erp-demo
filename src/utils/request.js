import axios from 'axios'
import { message } from 'antd'

// 创建一个独立 axios 实例，后续所有真实接口都可以复用它。
const request = axios.create({
  // baseURL 会自动拼到请求地址前面，比如 /api/users。
  baseURL: '/api',
  // 超时时间，避免请求一直挂起。
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    // 请求发出前统一读取 token，避免每个接口都手动拼 Authorization。
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => {
    // 真实项目里通常只把后端返回的业务数据交给页面组件。
    return response.data
  },
  (error) => {
    // 这里先做最小统一错误提示；后续可以扩展 401 跳登录等逻辑。
    message.error(error?.message || '请求失败，请稍后重试')
    return Promise.reject(error)
  },
)

export default request
