"use client"
import React, { use, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../../store/store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "./style.css"
import { getOneDoctor } from '@/store/doctorSlice';
const AllPatients: React.FC = () => {
  const ellipsis = faEllipsisVertical as IconProp;
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
 
  const dispatch:AppDispatch=useDispatch()


  useEffect(() =>{dispatch(getOneDoctor())},[])
  return (
    <div className="Patients-content">
      <div className="Patients-container">
        <div className="Patients-container-header">
          <span>Patient Name</span>
          <span>Visit Id</span>
          <span>Date</span>
          <span>Gender</span>
          <span>Diseases</span>
          <span>Status</span>
        </div>
        {doctor.Appointments?.map((appo: any, i: number) =>
          appo.isFinished ? (
            <div className="OnePatient" key={i}>
              <div className="OnePatient-details">
                <div className="DoctorProfile-th">
                  <div className="DoctorProfile-patient-done">
                    <div className="DoctorProfile-image-frame3">
                      <img src={appo.Patient.avatarUrl} alt="patient-image" />
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default AllPatients;
