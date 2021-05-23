

import axios from '../utils/axios'
import {getLocal} from '@/common/js/utils.js'

let user_id = JSON.parse(getLocal('token')).id

export function createOrder(params) {
  return axios.post('/saveOrder', params);
}

export function getOrderList() {
  return axios.get(`/getOrder?user_id=${user_id}`);
}

export function getOrderDetail(id) {
  return axios.get(`/getOrderDetail?order_id=${id}`);
}

export function cancelOrder(id) {
  return axios.get(`/cancelOrder?order_id=${id}`);
}

export function confirmOrder(id) {
  return axios.put(`/order/${id}/finish`)
}

//modified
export function payOrder(params) {
  return axios.get(`/pushOrder?user_id=${user_id}&item_id=${params.item_id}&num=${params.num}&time=${params.time}`)
}




