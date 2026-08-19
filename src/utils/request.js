import axios from 'axios'
// import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'https://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 1000 //超时时间 1s内未收到服务器响应 axios会自动中断请求 并抛出超时错误
  // headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 携带TOKEN
    // 这里拿到的user是被pinia用reactive包装过的 所以下面调用的时候不需要.value
    // const user = useUserStore()
    // config是本次请求的配置对象
    // if (user.token) config.headers.Authorization = user.token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 响应包含code 其中 0成功 1失败
    if (response.data.code === 0) {
      return response
    }
    // 处理业务失败 抛出错误 并给提示
    ElMessage.error(response.data || '服务异常')
    return Promise.reject(response.data)
  },
  function (error) {
    // 处理401错误 401-权限不足
    if (error.response?.status === 401) {
      router.push('/login')
    }

    // 其他错误 提示
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
