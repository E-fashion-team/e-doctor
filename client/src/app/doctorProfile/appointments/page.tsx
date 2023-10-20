"use client"
import React, { useEffect } from 'react'
import './style.css'
import OneAppointment from './OneAppointment'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store"; 
import { getOnePatient } from "../../../store/patinetSlice";
import { getOneDoctor } from "../../../store/doctorSlice";

const AllAppointments = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo)
  console.log(doctor,"doctor")

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "patient") {
      dispatch(getOnePatient())
    } else if (type === "doctor") {
      dispatch(getOneDoctor())
    }
  }, [])  
  

  
  const type = localStorage.getItem('type');
  return (
    <div className="appointments-container">
      {type === "patient" ?
        patient.appointments?.map((appo: any, i: number) => !appo.isFinished ? <OneAppointment key={i} appo={appo} /> : null) :
        doctor.appointments?.map((appo: any, i: number) => !appo.isFinished ? < OneAppointment key={i} appo={appo} /> : null)
      }
    </div>
  )
}

export default AllAppointments