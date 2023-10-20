"use client"
import React, { useEffect } from 'react';
import SideBar from './sidebar/page';
import TopNav from './TopNav/page';
import './style/style.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import  {AppDispatch, store}  from '../../store/store';
import { getOnePatient } from '@/store/patinetSlice';
import { getOneDoctor } from '@/store/doctorSlice';
import Overview from './Overview/page';

const DoctorProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const doctor =useSelector((state:any) => state.doctor.doctorInfo)
  console.log(doctor.doctor,'here the doctor ')
  
  // useEffect(() => {
  //   const type = localStorage.getItem("type")
  //   if (type === "patient") {
  //     dispatch(getOnePatient())
  //   } else if (type === "doctor") {
  //     dispatch(getOneDoctor())
      
  //   }
  // },[])

  return (

    <div className="DoctorProfile-body">
    <SideBar/>
   
      
      
      <div className="DoctorProfile-main">
      <TopNav/>
        <Overview/>
    
      </div>
    </div>

  );
};

export default DoctorProfile;