import React from 'react'
import "./style.css"
import OnePatient from './OnePatient'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { ReduxProvider } from '../../../store/provider'

const AllPatients = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  return (
    
    <div className='Patients-content'>
      <div className='Patients-container'>
        <div className='Patients-container-header'>
          <span>Patient Name</span>
          <span>Visit Id</span>
          <span>Date</span>
          <span>Gender</span>
          <span>Diseases</span>
          <span>Status</span>
        </div>
        {/* { doctor.Appointments?.map((appo: any, i: number) => appo.isFinished ? < OnePatient key={i} appo={appo} /> : null)} */}
      </div>
    </div>

  )
}

export default AllPatients