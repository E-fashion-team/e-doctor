"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';

const Payment = () => {

const [paymentStatus, setPaymentStatus] = useState(null)
// const [paymentStatus, setPaymentStatus] = useState('success')
// const [paymentStatus, setPaymentStatus] = useState('fail')
const navigate = useRouter()


const payment = async () => {
    const amount = '3000' //this is just for testing till our payment's front is ready

    try {
        const response = await axios.post(`http://127.0.0.1:5000/api/payment/${amount}`)
        window.location.href = response.data.result.link
    } catch (err) {
        console.error(err)
    }
}

useEffect(() => {

})

return (
    <div>
        <div><button onClick={payment}>PRESS</button></div> this element is just for testing the function that'll be invoked when the invoices payment interface is ready to be used
    </div>
)


}

export default Payment