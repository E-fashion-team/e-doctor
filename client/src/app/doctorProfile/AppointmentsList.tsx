import React from "react";
import AppointmentRequest from "./AppointmentRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";

const AppointmentsList = () => {
  const doctor: any = useSelector(
    (state: RootState) => state.doctor.doctorInfo
  );

  const navigate = useRouter();
  return (
    <div className="DoctorProfile-appointment-requests-list">
      <div className="DoctorProfile-appointment-requests-list-header">
        <span className="DoctorProfile-appointment-requests-list-header-title">
          Appointment Request
        </span>
        <span
          className="DoctorProfile-appointment-requests-list-header-view"
          onClick={() => navigate.push("/doctorProfile/appointments")}
        >
          View all
        </span>
      </div>
      <div className="DoctorProfile-appointment-requests-list-container">
        {doctor.appointments?.map((appo: any, index: number) =>
          index < 4 ? <AppointmentRequest appo={appo} key={index} /> : null
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
