import axios from 'axios'

const token = localStorage.getItem('token')

export const api = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://invoice.geminie.blog',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)
