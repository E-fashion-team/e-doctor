"use client"
import React, { useEffect } from "react";
import '../style/style.css'
import CalendarComponent from "../CalendarComponent/page";
import Stocks from "../Stocks/page";
import Charts from "../Charts/page";
import DonePatients from "../DonePatients/page";
import DoctorCards from "../DoctorCards/page";
import AppointmentsList from "../AppointmentList/page";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getOnePatient } from "../../../store/patinetSlice";
import { getOneDoctor } from "../../../store/doctorSlice";

const Overview = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor);
  const dispatch: AppDispatch = useDispatch()
  // useEffect(() => {
  //   const type = localStorage.getItem("type")
  //   if (type === "patient") {
  //     dispatch(getOnePatient())
  //   } else if (type === "doctor") {
  //     dispatch(getOneDoctor())
  //   }
  //   console.log(doctor);
    
  // },[])

  return (
    <div style={{ backgroundColor: "#F7F6F6" }}>
      <div className="DoctorProfile-mid">
    
        <span className="DoctorProfile-welcome">Welcome, {doctor.name}</span>
        <span>Have a nice day at great work</span>
      </div>
      <DoctorCards />
      <div className="DoctorProfile-middle">
        <AppointmentsList />
        <div className="DoctorProfile-statistics">
          <Stocks />
          <Charts />
        </div>
        <div className="DoctorProfile-Calendar-section">
          <Calendar className="DoctorProfile-calendar" />
        </div>
      </div>
      <DonePatients />
    </div>
  );
};

export default Overview;
