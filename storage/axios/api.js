import * as axios from 'axios'

export const serverUrl = "https://api-resttv.info"
// export const serverUrl = "http://localhost:8000"

const api = axios.create({
    withCredentials: true,
    baseUrl: '',
})

const refreshApi = axios.create({
    withCredentials:true,
    baseUrl:''
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
api.interceptors.response.use((config) => {

    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401) {
        console.log('refreshing token')
        const response = await axios.post(`${serverUrl}/admin/refresh`,{},{withCredentials:true})
        console.log('GIGANIGGA')
        console.log(response.data)
        localStorage.setItem('token', response.data.adminData.accessToken)
        return api.request(originalRequest)
    }
})
export default api