"use client"

import './style.css'
import React, { useEffect, useState } from 'react'

const loading = () => {

    const [loading, setLoading] = useState('loading')


    const animation = () => {
        setTimeout(() => {
            if(loading === 'loading...') setLoading('loading')
            setLoading(prev => `${prev}.`)
        }, 1000)
    }

    useEffect(() => {
        animation()
    }, [loading])


  return (
    <div id='loadingComponent'>
        {loading}
    </div>
  )
}

export default loading