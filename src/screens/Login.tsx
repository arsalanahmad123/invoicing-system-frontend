import banner from '../assets/banner.png'
import { api } from '../api/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const { setUser, setLoggedIn } = useAuth()

    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            if (email === '' || password === '') {
                toast.error('All fields are required')
                return
            }
            const response = await api.post('/api/auth/login', {
                email,
                password,
            })

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                setLoggedIn(true)
                setUser(response.data)
                const expiryDate = new Date()
                expiryDate.setDate(expiryDate.getDate() + 1)
                localStorage.setItem('expiry', expiryDate.toISOString())

                navigate('/')
            }
        } catch (error) {
            toast.error('Invalid credentials')
            console.log(error)
        }
    }

    return (
        <div className='flex min-h-screen justify-center items-center bg-white/10'>
            <div className='max-w-[70%] bg-white/80 grid grid-flow-row grid-cols-2 rounded-2xl overflow-hidden filter drop-shadow-2xl'>
                <img src={banner} alt='banner' />
                <div className='flex flex-col py-5'>
                    <h1 className='text-3xl font-semibold text-center'>
                        Members Log in
                    </h1>
                    <p className='text-center font-light'>
                        Log in with your email and password
                    </p>
                    <div className='flex flex-col mt-20 p-3'>
                        <input
                            type='email'
                            id='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                        />

                        <input
                            type='password'
                            id='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-b border-slate-300 mt-5 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                        />

                        <button
                            className='bg-primary text-white font-semibold py-2 rounded-2xl mt-10 w-[200px] mx-auto'
                            onClick={handleLogin}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
