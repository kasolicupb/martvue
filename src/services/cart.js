
import axios from '../utils/axios'
import {getLocal} from '@/common/js/utils.js'
let user_id = JSON.parse(getLocal('token')).id;
// console.log(getLocal('token'))
// if(getLocal('token')) {
//   console.log(1)
//   window.location.href='/login'
  
// }
// else {
//   user_id = JSON.parse(getLocal('token')).id
// }


export function addCart(params) {
  return axios.get(`/addCart?user_id=${user_id}&item_id=${params.item_id}&status=${params.status}`);
}

export function modifyCart(params) {
  return axios.get(`/modifyCart?user_id=${params.user_id}&item_id=${params.item_id}&num=${params.num}`);
}

export function getCart() {
  return axios.get(`/getCart?id=${user_id}`);
}

export function deleteCartItem(id) {
  return axios.get(`/delCart?user_id=${user_id}&item_id=${id}`);
}

export function getByCartItemIds(params) {
  return axios.get('/shop-cart/settle', { params });
}

