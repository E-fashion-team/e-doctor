'use client'
import './style.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import OneAppointment from '../../components/oneAppointment/OneAppointment';

const AllAppointments = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo);
  const dispatch: AppDispatch = useDispatch();
  const [type, setType] = useState(''); // State to store the 'type' from localStorage

  useEffect(() => {
    const storedType = localStorage.getItem('type');
    if (storedType) {
      setType(storedType); // Set the 'type' in the component's state
    }
  }, []); // Runs only once after the initial render

  return (
    <div className="appointments-container">
      {type === 'patient' ?
        patient.Appointments?.map((appo: any, i: number) => !appo.isFinished ? <OneAppointment key={i} appo={appo} /> : null) :
        doctor.Appointments?.map((appo: any, i: number) => !appo.isFinished ? <OneAppointment key={i} appo={appo} /> : null)
      }
    </div>
  );
};

export default AllAppointments;
