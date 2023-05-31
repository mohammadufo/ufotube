import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_HOST === 'development'
      ? 'http://localhost:8800/api/'
      : process.env.REACT_APP_HOST,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
