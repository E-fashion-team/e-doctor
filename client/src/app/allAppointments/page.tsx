'use client'
import './style.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import OneAppointment from '../../components/oneAppointment/OneAppointment';

const allAppointments = () => {
    const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
    const patient: any = useSelector((state: RootState) => state.patient.patientInfo)
    const dispatch: AppDispatch = useDispatch()
    const type = localStorage.getItem('type');
  return (
    <div className="appointments-container">
    {type === "patient" ?
      patient.Appointments?.map((appo: any, i: number) => !appo.isFinished ? <OneAppointment key={i} appo={appo} /> : null) :
      doctor.Appointments?.map((appo: any, i: number) => !appo.isFinished ? < OneAppointment key={i} appo={appo} /> : null)
  }
  </div>
  )
}

export default allAppointments