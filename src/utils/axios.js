import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = "/api"
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  // if (typeof res.data !== 'object') {
  //   Toast.fail('服务端异常！')
  //   return Promise.reject(res)
  // }
  if (res.data.Status != 200) {
    console.log(res)
    if (res.data.msg) Toast.fail(res.data.msg)
    if (res.data.resultCode == 416) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios
