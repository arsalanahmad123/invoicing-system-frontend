import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

interface Quantities {
    quantity: number
    description: string
    unitprice: number
}

const GenerateInvoice = () => {
    const [quantities, setQuantities] = React.useState<Quantities[]>([])
    const [to, setTo] = useState('')
    const [address, setAddress] = useState('')
    const [total, setTotal] = useState(0)
    const [quant, setQuant] = useState(0)
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [subtotal, setSubTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const addQuantity = () => {
        if (quant > 0 && desc !== '' && price > 0) {
            setQuantities([
                ...quantities,
                { quantity: quant, description: desc, unitprice: price },
            ])
            setSubTotal(subtotal + quant * price)
            setQuant(0)
            setDesc('')
            setPrice(0)
        } else {
            toast.error('All fields are required')
            return
        }
    }

    const handleGenerate = async () => {
        setLoading(true)
        if (
            to === '' ||
            address === '' ||
            quantities.length === 0 ||
            total === 0
        ) {
            toast.error('All fields are required')
            return
        }

        const token = localStorage.getItem('token')
        if (token) {
            const response = await api.post(
                '/api/invoice/create',
                {
                    to,
                    address,
                    total,
                    quantities,
                    subtotal,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )

            if (response.status === 201) {
                toast.success('Invoice generated')
                setLoading(false)
                const id = response.data.data
                navigate(`/invoice/${id}`)
            }
        }
    }

    useEffect(() => {
        const VAT = subtotal * 0.2
        setTotal(subtotal + VAT)
    }, [subtotal])

    return (
        <div className='flex flex-col m-14 h-screen'>
            <h1 className='text-3xl font-bold'>Generate Invoice</h1>
            <div className='flex flex-col bg-white/80  rounded-md overflow-hidden filter drop-shadow-2xl p-5 mt-5'>
                <div className='grid grid-flow-row grid-cols-2 gap-5'>
                    <input
                        type='text'
                        placeholder='To.....'
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                    />
                    <input
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                    />
                </div>

                <div className='flex flex-col mt-8 text-xl'>
                    <h3>Add Quantities</h3>
                    <div className='grid grid-flow-row grid-cols-4 gap-5 mt-2'>
                        <input
                            type='number'
                            placeholder='Quantity'
                            className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                            value={quant}
                            min={0}
                            onChange={(e) => setQuant(Number(e.target.value))}
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary '
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <input
                            type='number'
                            placeholder='Unit Price'
                            className='border-b border-slate-300 p-2 bg-transparent transition-all duration-150 ease-in outline-none ring-0 text-lg focus:border-primary'
                            value={price}
                            min={0}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <button
                            className='px-4 py-1 bg-primary text-white font-semibold'
                            onClick={addQuantity}
                        >
                            Add
                        </button>
                    </div>
                    {quantities.length > 0 && (
                        <div className='overflow-x-auto mt-10'>
                            <table className='table'>
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Quantity</th>
                                        <th>Description</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quantities.map((quantity, i) => (
                                        <tr key={i}>
                                            <td>{quantity.quantity}</td>
                                            <td>{quantity.description}</td>
                                            <td>{quantity.unitprice}</td>
                                            <td>
                                                {quantity.quantity *
                                                    quantity.unitprice}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className='mt-10 flex flex-col'>
                        <h3>Subtotal : {subtotal}</h3>
                        <h3>Total : {total}</h3>
                    </div>

                    <button
                        className='mt-6 max-w-[200px] bg-primary text-white font-semibold ml-auto px-4 py-1 '
                        onClick={handleGenerate}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GenerateInvoice
