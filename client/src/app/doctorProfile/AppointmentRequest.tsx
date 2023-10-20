import React, { useEffect } from "react";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { getOnePatient } from "../../store/patinetSlice";
import { getOneDoctor } from "../../store/doctorSlice";

type Appprops = {
  appo: any
};

const AppointmentRequest = ({ appo }: Appprops) => {
  const dispatch: AppDispatch = useDispatch()
  // useEffect(() => {
  //   const type = localStorage.getItem("type")
  //   if (type === "patient") {
  //     dispatch(getOnePatient())
  //   } else if (type === "doctor") {
  //     dispatch(getOneDoctor())
  //   }
  // },[])

  const handelUpdateAppointment = async (appoId: string, status: string) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/appointment/${appoId}`, { status })
    } catch (error) {
      console.log(error);
    }
  }
  const decline = faRectangleXmark as IconProp;
  const accept = faSquareCheck as IconProp;
  return (
    <div className="DoctorProfile-appointment-requests-list-container-request">
      <div className="DoctorProfile-image-frame2">
        <img
          src={appo.Patient.avatarUrl}
          alt="patinet-image"
        />
      </div>
      <div className="DoctorProfile-appointment-requests-list-container-request-details">
        <span className="DoctorProfile-appointment-requests-list-container-request-details-name">
          {appo.Patient.name}
        </span>
        <span className="DoctorProfile-appointment-requests-list-container-request-details-data">
          {appo.Patient.gender.toUpperCase() + ' , ' + appo.date}
        </span>
      </div>
      {appo.status !== "pending" ? (
        <div
          className={
            appo.status === "accepted" ? "DoctorProfile-confirmed" : "DoctorProfile-declined"
          }
        >
          <span className={
            appo.status === "accepted" ? "DoctorProfile-confirmed-content" : "DoctorProfile-declined-content"
          }>
            {appo.status === "accepted" ? "Confirmed" : "Declined"}
          </span>
        </div>
      ) : (
        <div className="DoctorProfile-pending">
          <FontAwesomeIcon
            onClick={() => handelUpdateAppointment(appo.id, "rejected")}
            className="DoctorProfile-pending-buttons"
            icon={decline}
            style={{ color: "rgb(242, 0, 255)" }}
          />
          <FontAwesomeIcon
            onClick={() => handelUpdateAppointment(appo.id, "accepted")}
            className="DoctorProfile-pending-buttons"
            icon={accept}
            style={{ color: "rgb(26, 88, 244)" }}
          />
        </div>
      )}
    </div>
  );
};

export default AppointmentRequest;
