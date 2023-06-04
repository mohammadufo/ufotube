import axios from 'axios'

function api(method: string, url: string, params: any, data: any) {
  const axiosRequest = axios.create({
    // baseURL: '/api',
    baseURL: 'http://localhost:8800/api',
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
    switch (Math.floor(response.status / 100)) {
      case 2:
        if (!response.status) {
          return reject('slm')
        }
        return resolve(response.data)
      default:
        if (
          response.response.status === 401 ||
          response.response.status === 403
        ) {
          reject(response.response.data.message)
        } else {
          reject(
            'Sorry, Something went wrong! and I do not know what is that! 💀'
          )
        }
    }
  })
}

export const publicService = {
  api,
  handleAxiosResponse,
}
