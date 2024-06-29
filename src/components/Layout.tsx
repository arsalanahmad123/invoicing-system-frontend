import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface layoutProps {
    children: ReactNode
}

const Layout: React.FC<layoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col max-w-full min-h-screen'>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
