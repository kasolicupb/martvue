import axios from '../utils/axios'

// modified
export function getDetail(id) {
    console.log(id)
  return axios.get(`/getDetail?id=${id}`);
}

export function getCategory() {
  return axios.get('/categories');
}

export function search(params) {
  return axios.get('/search', { params });
}

