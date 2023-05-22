import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000'
}) as { [key: string]: any }

export default axiosInstance