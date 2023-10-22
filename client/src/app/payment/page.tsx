"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import Loading from '../../components/loading/loading'

const Payment = () => {

const [paymentStatus, setPaymentStatus] = useState(null)
const navigate = useRouter()


const payment = async () => {

    const amount = ''

    // try {
    //     const response = await axios.post(`http://127.0.0.1:5000/api/payment/${amount}`)
    //     window.location.href = response.data.result.link
    // } catch (err) {
    //     console.error(err)
    // }
}

useEffect(() => {
    payment()
}, [])

return (
    <div>
        <Loading/>
    </div>
)


}

export default Payment