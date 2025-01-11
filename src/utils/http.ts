import axios from 'axios'
const http = axios.create({
  baseURL: 'http://localhost:5174/',
  timeout: 5000
})
//axios请求拦截器
//一般会进行token身份验证登
http.interceptors.request.use((config) => {
  return config
}),
  (e: any) => Promise.reject(e)

//axios响应拦截器
//一般会进行错误的统一提示，token失效的处理等
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

//导出http
export default http
