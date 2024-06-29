import { useEffect, useState } from 'react'
import { api } from '../api/api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

interface Invoice {
    _id: number
    to: string
    address: string
    total: number
    createdAt: string
}

const Dashboard = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [searchByID, setSearchByID] = useState('')
    const [searchByName, setSearchByName] = useState('')

    const getInvoices = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await api.get('/api/invoice', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (response.status === 200) {
                    setInvoices(response.data.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            getInvoices()
        } else {
            console.log('Token is not available')
        }
    }, [])

    const handleDate = (date: string) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: 'long', // Full month name
            day: '2-digit', // Two-digit day
            year: 'numeric', // Full year
        })

        return formattedDate
    }

    const filteredInvoices = invoices.filter((invoice) => {
        if (!searchByID && !searchByName) {
            return true
        }

        const idMatches = searchByID
            ? invoice._id.toString().includes(searchByID)
            : true

        const nameMatches = searchByName
            ? invoice.to.toLowerCase().includes(searchByName.toLowerCase())
            : true

        return idMatches && nameMatches
    })

    const deleteInvoice = async (id: number) => {
        try {
            const confirmDelete = confirm('Are u sure you want to delete?')
            if (!confirmDelete) return
            const token = localStorage.getItem('token')
            if (token) {
                const response = await api.delete(`/api/invoice/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (response.status === 200) {
                    toast.success('Invoice deleted')
                    getInvoices()
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Error occured while deleting invoice')
        }
    }

    return (
        <div className='flex flex-col  mt-20 max-w-[1280px] mx-auto'>
            <div className='flex flex-row justify-between items-center'>
                <h3 className='text-gray-900 font-bold text-3xl'>
                    Previous Invoices
                </h3>
                <div className='flex flex-row justify-start items-center gap-4'>
                    <input
                        type='text'
                        name='searchByID'
                        placeholder='Search By ID'
                        value={searchByID}
                        onChange={(e) => setSearchByID(e.target.value)}
                        className='p-2 border-b border-gray-500 ring-0 outline-none rounded-sm'
                    />
                    <input
                        type='text'
                        name='searchByName'
                        placeholder='Search By Name'
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                        className='p-2 border-b border-gray-500 ring-0 outline-none rounded-sm'
                    />
                </div>
            </div>
            <div className='overflow-x-auto mt-5 '>
                <table className='table'>
                    {/* head */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>To</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice._id}</td>
                                <td>{invoice.to}</td>
                                <td>{invoice.address}</td>
                                <td>{invoice.total}</td>
                                <td>{handleDate(invoice.createdAt)}</td>
                                <td>
                                    <button
                                        className='btn btn-xs btn-error text-white'
                                        onClick={() =>
                                            deleteInvoice(invoice._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className='btn btn-xs  ml-2'
                                        to={`/invoice/${invoice._id}`}
                                        target='_blank'
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
