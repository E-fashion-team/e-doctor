import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface appProps {
  appo: any
}
const OnePatient = ({ appo }: appProps) => {
  console.log(appo);
  
  const ellipsis = faEllipsisVertical as IconProp;
  return (

    <div className='OnePatient'>
      <div className='OnePatient-details'>
        <div className="DoctorProfile-th">
          <div className="DoctorProfile-patient-done">
            <div className="DoctorProfile-image-frame3">
              <img
                src={appo.Patient.avatarUrl}
                alt="patinet-image"
              />
            </div>
            <div className="DoctorProfile-appointment-requests-list-container-request-details">
              <span className="DoctorProfile-appointment-requests-list-container-request-details-name">
                {appo.Patient.name}
              </span>
            </div>
          </div>
        </div>
        <span>{appo.id}</span>
        <span>{appo.date}</span>
        <span>{appo.Patient.gender.toUpperCase()}</span>
        <span>{appo.disease.slice(0, 14)}...</span>
        <span>Out-Patient</span>
      </div>

      <FontAwesomeIcon icon={ellipsis} />

    </div>
  )
}

export default OnePatient