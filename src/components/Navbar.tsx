import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Navbar = () => {
    const navigate = useNavigate()
    const { setLoggedIn, setUser, setToken } = useAuth()

    const handleClick = () => {
        navigate('/generate-invoice')
    }

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('loggedIn')
            localStorage.removeItem('expiry')
            setLoggedIn(false)
            setUser(null)
            setToken(null)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full p-7 bg-primary text-white flex flex-row justify-between items-center'>
            <div
                className='text-3xl font-bold cursor-pointer'
                onClick={() => navigate('/')}
            >
                Invoicing-System
            </div>
            <div className='flex flex-row gap-5 justify-start items-center'>
                <div
                    className='text-lg font-bold hover:bg-white hover:text-primary px-2 py-1 rounded-sm cursor-pointer transition-all duration-150 ease-in'
                    onClick={() => navigate('/')}
                >
                    Dashboard
                </div>
                <div
                    className='text-lg font-bold hover:bg-white hover:text-primary px-2 py-1 rounded-sm cursor-pointer transition-all duration-150 ease-in'
                    onClick={handleClick}
                >
                    Generate Invoice
                </div>
                <div
                    className='text-lg font-bold bg-white text-red-600 px-4 py-1 rounded-sm cursor-pointer'
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar
