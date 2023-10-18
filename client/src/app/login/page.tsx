"use client"

import React from 'react'
import Form from "./Form"
import doctor from "../../images/image 17.png"
import "./style.css"
import Image from 'next/image'

const Login = () => {
  return (
    <div className='container-login'>
            <Form />
            <div className='image-doctor-wrapper'>
                <Image className='image-doctor' src={doctor} alt="" />
                <svg xmlns="http://www.w3.org/2000/svg" width="520" height="548" viewBox="0 0 520 548" fill="none">
                    <path d="M371.861 69.4458C407.056 98.7392 437.929 129.716 463.554 167.091C489.178 204.802 510.172 248.91 517.273 297.732C524.374 346.555 517.582 399.754 497.205 447.903C477.138 495.716 437.796 488.481 395.5 507C363.5 529 316 548 263.5 548C214 548 182 545 139 522C102 490.5 41.5208 478.544 18.9835 441.506C-3.86244 404.468 0.151041 348.912 0.459771 293.355C0.7685 238.135 -2.62753 182.579 14.97 136.114C32.5676 89.6481 71.1588 52.2738 114.998 28.3677C158.838 4.46155 208.235 -5.63964 252.692 3.11472C297.149 12.2058 336.666 40.1524 371.861 69.4458Z" fill="url(#paint0_linear_228_1145)" />
                    <defs>
                        <linearGradient id="paint0_linear_228_1145" x1="260" y1="0" x2="260" y2="548" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#007E85" />
                            <stop offset="1" stopColor="#2B8500" stopOpacity="0.49" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
  )
}

export default Login