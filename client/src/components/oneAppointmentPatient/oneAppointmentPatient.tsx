"use client"

import React from 'react'
import './style.css'

type Appprops = {
    appo: any;
  };

const oneAppointmentPatient = ({appo}: Appprops) => {

    const type = localStorage.getItem('type');


  return (
    <div className="appointment-requests-list-container-request-details">
        <span className="appointment-requests-list-container-request-details-name">
          {type === "patient" ? appo.Doctor.name : type === "doctor" ? appo.Patient.name : ""}
        </span>
        <span className="appointment-requests-list-container-request-details-data">
          {type === "patient" ? appo.date : type === "doctor" ? appo.Patient.gender.toUpperCase() + ' , ' + appo.date : ""}
        </span>
        <button>Pay</button>
      </div>
  )
}

export default oneAppointmentPatient