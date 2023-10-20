"use client"
import React, { useEffect } from "react";
// import CalendarComponent from "./CalendarComponent";
import Stocks from "../Stocks";
import Charts from "../Charts";

import DoctorCards from "../DoctorCards";
import AppointmentsList from "../AppointmentsList";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getOnePatient } from "../../../store/patinetSlice";
import { getOneDoctor } from "../../../store/doctorSlice";
import {useRouter} from 'next/navigation'
const Overview = () => {
  const navigate = useRouter()
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
    const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "patient") {
      dispatch(getOnePatient())
    } else if (type === "doctor") {
      dispatch(getOneDoctor())
    }
  },[])

  return (
    <div style={{ backgroundColor: "#F7F6F6" }}>
      <div className="DoctorProfile-mid">
        <span className="DoctorProfile-welcome">Welcome, {doctor.name}</span>
        <span>Have a nice day at great work</span>
      </div>
      <DoctorCards />
      <div className="DoctorProfile-middle"  onClick={() => navigate.push("/doctorProfile/AppointmentsList")}>
        <AppointmentsList />
        <div className="DoctorProfile-statistics">
          <Stocks />
          <Charts />
        </div>
        <div className="DoctorProfile-Calendar-section">
          <Calendar className="DoctorProfile-calendar" />
        </div>
      </div>
      
    </div>
  );
};

export default Overview;
