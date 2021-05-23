import axios from '../utils/axios'

//modified
export function getHome() {
  return axios.get('/get');
}

