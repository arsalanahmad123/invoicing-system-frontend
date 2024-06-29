import { useState, useEffect, createContext, useContext } from 'react'

interface UserContextType {
    user: object | null
    setUser: React.Dispatch<React.SetStateAction<object | null>>
    loggedIn: boolean
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const UserContext = createContext<UserContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<object | null>(null)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        const expiry = localStorage.getItem('expiry')

        if (storedUser && storedToken && expiry) {
            const now = new Date()
            const expiryDate = new Date(expiry)

            if (now < expiryDate) {
                setUser(JSON.parse(storedUser))
                setToken(storedToken)
                setLoggedIn(true)
            } else {
                // Expired, clear local storage
                localStorage.removeItem('user')
                localStorage.removeItem('token')
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
                    setToken(null)
                    setLoggedIn(false)
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expiry')
                }, timeout)

                return () => clearTimeout(timer)
            }
        }
    }, [loggedIn])

    return (
        <UserContext.Provider
            value={{ user, setUser, loggedIn, setLoggedIn, token, setToken }}
        >
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
