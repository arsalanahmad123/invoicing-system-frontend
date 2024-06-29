import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://invoicing-system-backend-a0kk.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
