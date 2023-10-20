import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const DoctorCards = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  const appointments = doctor.Appointments
  const calendar = faCalendar as IconProp;
  const user = faUser as IconProp;
  const building = faBuilding as IconProp;
  const video = faVideo as IconProp;
  return (
    <div className="DoctorProfile-card-container">
      <div
        className="DoctorProfile-card"
        id="DoctorProfile-card-appointments"
      >
        <div className="DoctorProfile-card-icon-container">
          <FontAwesomeIcon
            className="DoctorProfile-card-icon"
            icon={calendar}
            style={{ color: "white" }}
          />
        </div>
        <div className="DoctorProfile-card-details">
          <span className="DoctorProfile-card-stat">{appointments?.length} Appointement</span>
          <span className="DoctorProfile-card-title">Appointments</span>
        </div>
      </div>
      <div className="DoctorProfile-card" id="DoctorProfile-card-patient">
        <div className="DoctorProfile-card-icon-container">
          <FontAwesomeIcon
            className="DoctorProfile-card-icon"
            icon={user}
            style={{ color: "white" }}
          />
        </div>
        <div className="DoctorProfile-card-details">
          <span className="DoctorProfile-card-stat">
            {appointments?.length} Patient</span>
          <span className="DoctorProfile-card-title">Total Patient</span>
        </div>
      </div>
      <div className="DoctorProfile-card" id="DoctorProfile-card-clinic">
        <div className="DoctorProfile-card-icon-container">
          <FontAwesomeIcon
            className="DoctorProfile-card-icon"
            icon={building}
            style={{ color: "white" }}
          />
        </div>
        <div className="DoctorProfile-card-details">
          <span className="DoctorProfile-card-stat">53.5K</span>
          <span className="DoctorProfile-card-title">Clinic Consulting</span>
        </div>
      </div>
      <div className="DoctorProfile-card" id="DoctorProfile-card-video">
        <div className="DoctorProfile-card-icon-container">
          <FontAwesomeIcon
            className="DoctorProfile-card-icon"
            icon={video}
            style={{ color: "white" }}
          />
        </div>
        <div className="DoctorProfile-card-details">
          <span className="DoctorProfile-card-stat">28.0K</span>
          <span className="DoctorProfile-card-title">Video Consulting</span>
        </div>
      </div>
    </div>
  )
}

export default DoctorCards