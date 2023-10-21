"use client"

import React, { useEffect,useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"; 
import { getOnePatient } from "../../store/patinetSlice";
import { getOneDoctor } from "../../store/doctorSlice";
import axios from "axios"
type Appprops = {
    appo: any;
  };
  

const oneAppointmentPatient = ({appo}: Appprops) => {
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo)
    const type = localStorage.getItem('type');
    const [doctor,setDoctor]=useState<string>("")
  console.log(appo,'appo')

  const dispatch: AppDispatch = useDispatch()
  const findDoctor=()=>{
    axios.get(`http://localhost:5000/api/doctor/${appo.DoctorId}`).then((response)=>{
      setDoctor(response.data.name)
    }).catch((error)=>{
    console.log(error)
  })
}
console.log(doctor,"ggg")
  useEffect(() => {
    
    findDoctor()
      dispatch(getOnePatient())
    },
   [])  
  
   
     return (
    <div className="appointment-requests-list-container-request-details">
        <span className="appointment-requests-list-container-request-details-name">
          {doctor}
        </span>
        <span className="appointment-requests-list-container-request-details-data">
          {appo.date }
        </span>
        <button>Pay</button>
      </div>
  )
}

export default oneAppointmentPatient