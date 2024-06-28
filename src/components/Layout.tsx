import { ReactNode } from 'react'
import Navbar from './Navbar'

interface layoutProps {
    children: ReactNode
}

const Layout: React.FC<layoutProps> = ({ children }) => {
    return (
        <div className='flex flex-col max-w-full'>
            <Navbar />
            <div>{children}</div>
        </div>
    )
}

export default Layout
