import { useState, useEffect, createContext, useContext } from 'react'

interface UserContextType {
    user: object | null
    setUser: React.Dispatch<React.SetStateAction<object | null>>
    loggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<object | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const user = localStorage.getItem('user')
        const expiry = localStorage.getItem('expiry')

        if (user && expiry) {
            const now = new Date()
            const expiryDate = new Date(expiry)

            if (now < expiryDate) {
                setUser(JSON.parse(user))
                setLoggedIn(true)
            } else {
                // Expired, clear local storage
                localStorage.removeItem('user')
                localStorage.removeItem('expiry')
            }
        }

        return () => {}
    }, [])

    useEffect(() => {
        if (loggedIn) {
            const expiry = localStorage.getItem('expiry')
            if (expiry) {
                const now = new Date()
                const expiryDate = new Date(expiry)
                const timeout = expiryDate.getTime() - now.getTime()

                const timer = setTimeout(() => {
                    setUser(null)
                    setLoggedIn(false)
                    localStorage.removeItem('user')
                    localStorage.removeItem('expiry')
                }, timeout)

                return () => clearTimeout(timer)
            }
        }
    }, [loggedIn])

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = (): UserContextType => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
