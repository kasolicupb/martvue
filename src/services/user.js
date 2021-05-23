

import axios from '../utils/axios'

export function getUserInfo() {
  return axios.get('/user/info');
}

export function EditUserInfo(params) {
  return axios.put('/user/info', params);
}

//modified
export function login(params) {
  return axios.post('/loginIn', params);
}

export function logout() {
  return axios.post('/user/logout')
}

//modified
export function register(params) {
  console.log(params)
  return axios.post('/reg', params);
}

