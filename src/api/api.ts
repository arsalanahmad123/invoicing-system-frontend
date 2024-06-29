import axios from 'axios'

const token = localStorage.getItem('token')

export const api = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://invoicing-system-backend-a0kk.onrender.com',
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
