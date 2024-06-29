import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://invoice.geminie.blog',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
