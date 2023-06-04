import axios from 'axios'

function api(method: string, url: string, params: any, data: any) {
  const axiosRequest = axios.create({
    baseURL: '/api',
  })

  const headers: { Accept: string } = {
    Accept: 'application/json',
  }
  return axiosRequest({
    method,
    url,
    params,
    data,
    headers,
    withCredentials: true,
  })
    .then((response: any) => {
      return handleAxiosResponse(response)
    })
    .catch((error: any) => {
      return handleAxiosResponse(error)
    })
}

function handleAxiosResponse(response: any) {
  return new Promise((resolve, reject) => {
    // const data = response.data
    switch (Math.floor(response.status / 100)) {
      case 2:
        if (!response.status) {
          return reject(response.message)
        }
        return resolve(response.data)
      case 4:
        return reject(response.message)
      case 5:
        return reject('global.error_500')
      default:
        return reject('global.error')
    }
  })
}

export const publicService = {
  api,
  handleAxiosResponse,
}
