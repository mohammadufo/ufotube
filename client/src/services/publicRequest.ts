import axios from 'axios'

function api(method, url, params, data) {
  const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_HOST,
  })

  let headers = {
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
    .then((response) => {
      return handleAxiosResponse(response)
    })
    .catch((error) => {
      return handleAxiosResponse(error)
    })
}

function formDataApi(method, url, _data, file, fieldName) {
  const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_HOST,
  })

  var newFormData = new FormData()
  newFormData.append('data', JSON.stringify(_data))
  newFormData.append(fieldName, file)

  let data = newFormData
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }
  return axiosRequest({ method, url, data, headers, withCredentials: true })
    .then((response) => {
      return handleAxiosResponse(response)
    })
    .catch((error) => {
      return handleAxiosResponse(error)
    })
}
function handleAxiosResponse(response) {
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
  formDataApi,
  handleAxiosResponse,
}
