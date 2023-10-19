"use client"
import React from 'react';
import SideBar from './sidebar/page';
import TopNav from './TopNav/page';
import './style/style.css';
import { Outlet } from "react-router";
import { Provider, useDispatch } from 'react-redux';
import  {AppDispatch, store}  from '../../store/store';

const DoctorProfile = () => {
  const dispatch: AppDispatch = useDispatch()
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
    
      <SideBar />
      <div className="DoctorProfile-main">
        <TopNav />
        <Outlet />
      </div>
    </div>

  );
};

export default DoctorProfile;