import './App.css'
import { useAuth } from './Context/AuthContext'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import GenerateInvoice from './screens/GenerateInvoice'
import DisplayInvoice from './screens/DisplayInvoice'

function App() {
    const { loggedIn } = useAuth()

    return (
        <>
            <Toaster />

            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/generate-invoice'
                        element={
                            loggedIn ? (
                                <Layout>
                                    <GenerateInvoice />
                                </Layout>
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/invoice'
                        element={
                            loggedIn ? (
                                <DisplayInvoice />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/login'
                        element={!loggedIn ? <Login /> : <Navigate to='/' />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
