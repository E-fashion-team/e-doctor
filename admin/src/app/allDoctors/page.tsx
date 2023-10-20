"use client"

import DocCard from '@/components/docCard/DocCard'
import NavBar from '@/components/navBar/NavBar'
import React,  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDoctors } from '@/store/doctorSlice'
import { AppDispatch } from '@/store/store'

const page = () => {
const dispatch: AppDispatch = useDispatch()

useEffect(() => {
  dispatch(getAllDoctors())
}, [])

  return (
    <div>
        <NavBar/>
        <DocCard/>
    </div>
  )
}

export default page