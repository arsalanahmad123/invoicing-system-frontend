import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/api'

interface Quantity {
    quantity: number
    description: string
    unitprice: number
}

interface Invoice {
    _id: number
    to: string
    address: string
    total: number
    quantities: Quantity[]
    subtotal: number
}
const DisplayInvoice = () => {
    const [invoice, setInvoice] = useState<Invoice>()

    const { id } = useParams()

    useEffect(() => {
        const getInvoice = async () => {
            try {
                const response = await api.get(`/api/invoice/${id}`)
                if (response.status === 200) {
                    setInvoice(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getInvoice()
    }, [])

    return (
        <div className='max-w-full mx-auto p-4 bg-white shadow-md'>
            <header className='flex justify-between items-center  pb-4 mb-4 relative'>
                <div className='absolute -top-56 -left-32 h-[500px] w-[500px] rounded-full bg-blue-900 flex justify-center'>
                    <div className='mt-[300px] invoice-logo'></div>
                </div>
                <div></div>
                <div className='text-primary text-7xl font-extrabold'>
                    INVOICE
                </div>
            </header>

            <section className='mb-4 mt-60 px-20'>
                <div className='flex justify-between mb-2'>
                    <div>
                        <h3 className='font-bold text-2xl mb-2'>BILL TO</h3>
                        <p className='uppercase font-semibold text-lg'>
                            {invoice?.to}
                        </p>
                        <p className='font-medium max-w-[250px]'>
                            {invoice?.address}
                        </p>
                    </div>
                    <div>
                        <h3 className='font-bold text-2xl'>BILL FROM</h3>
                        <p className='font-semibold text-lg uppercase'>
                            POSHMARK TRADING LIMITED
                        </p>
                        <p className='text-sm'>
                            34 Broughton Street,Manchester,
                        </p>
                        <p className='text-sm'>United Kingdom, M8 8nn</p>
                        <p className='text-sm'>
                            <span className='font-semibold mr-2'>Email:</span>{' '}
                            poshmarktrading@gmail.com
                        </p>
                        <p className='text-sm'>
                            <span className='font-semibold mr-2'>
                                Mobile Number
                            </span>
                            : 07541 22427
                        </p>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p>
                            Date:{'   '}
                            {new Date().toLocaleDateString('en-US', {
                                month: 'long', // Full month name
                                day: '2-digit', // Two-digit day
                                year: 'numeric', // Full year
                            })}
                        </p>
                        <p>Invoice: {invoice?._id}</p>
                    </div>
                </div>
            </section>

            <section className='mb-4 px-20 mt-5'>
                <table className='w-full text-left border-collapse'>
                    <thead className='bg-primary p-5 text-white'>
                        <tr className='border-b'>
                            <th className='p-2'>Qty.</th>
                            <th className='p-2'>Item Description</th>
                            <th className='p-2'>Unit Price</th>
                            <th className='p-2'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice?.quantities.map((quantity: Quantity) => (
                            <tr key={quantity.quantity}>
                                <td className='p-2 font-bold'>
                                    <p>{quantity.quantity}</p>
                                </td>
                                <td className='p-2 font-bold'>
                                    <p>{quantity.description}</p>
                                </td>
                                <td className='p-2 font-bold'>
                                    <p>€{quantity.unitprice}</p>
                                </td>
                                <td className='p-2 font-bold'>
                                    <p>
                                        €
                                        {quantity.quantity * quantity.unitprice}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className='flex justify-between mb-4 mt-5'>
                <div className='text-right ml-auto mr-20'>
                    <p className='text-start'>
                        {' '}
                        <span className='font-bold mr-3'>Sub-Total:</span> €
                        {invoice?.subtotal}
                    </p>
                    <p className='text-start'>
                        {' '}
                        <span className='font-bold mr-3'>VAT:</span> 20%
                    </p>
                    <p className='text-start border-t-2 border-gray-500 mt-2'>
                        {' '}
                        <span className='font-bold mr-3'> Total:</span> €
                        {invoice?.total}
                    </p>
                </div>
            </section>

            <footer className='border-t pt-4'>
                <p className='text-center mb-2'>
                    <strong>Terms & Conditions:</strong>
                </p>
                <p className='text-center mb-2'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
                <p className='text-center text-gray-500'>
                    Thank you for your business
                </p>
            </footer>
        </div>
    )
}

export default DisplayInvoice
