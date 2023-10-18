// components/SideBar.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faUser, faClock, faCreditCard, faEnvelope, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';
import { useSelector } from 'react-redux';
// import { RootState } from '../../../../store/store';
import logo1 from '../../../images/logo1.png';
import logo2 from '../../../images/logo2.png';
import React from "react";

const SideBar = () => {
//   const patient = useSelector((state: RootState) => state.patient);
//   const doctor = useSelector((state: RootState) => state.doctor);

  const overview = faBars as IconProp;
  const calendar = faCalendar as IconProp;
  const user = faUser as IconProp;
  const clock = faClock as IconProp;
  const creditCard = faCreditCard as IconProp;
  const message = faEnvelope as IconProp;
  const blog = faFileLines as IconProp;

  // Handle client-side navigation
  const handleNavigate = (path:string) => {
    window.location.href = path;
  };

  return (
    <div className="DoctorProfile-sideBar">
      <div className="DoctorProfile-logo"  onClick={() => handleNavigate("/")}>
        <Image src={logo1} alt="" width={100} height={100} />
        <Image src={logo2} alt="" width={100} height={100} />
      </div>

      <ul className="DoctorProfile-menu">
        <li  onClick={() => handleNavigate("/doctorProfile")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={overview} style={{ color: "#070808" }} />
          Overview
        </li>
        <li onClick={() => handleNavigate("/doctorProfile/appointments")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={calendar} style={{ color: "#070808" }} />
          Appointment
        </li>
        <li onClick={() => handleNavigate("/doctorProfile/patients")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={user} style={{ color: "#070808" }} />
          My Patients
        </li>
        <li onClick={() => handleNavigate("/doctorProfile/schedule")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={clock} style={{ color: "#070808" }} />
          Schedule Timings
        </li>
        <li>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={creditCard} style={{ color: "#070808" }} />
          Payments
        </li>
        <li onClick={() => handleNavigate("/doctorProfile/docChat")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={message} style={{ color: "#070808" }} />
          Message
        </li>
        <li onClick={() => handleNavigate("/doctorProfile/review")}>
          <FontAwesomeIcon className="DoctorProfile-icon" icon={blog} style={{ color: "#070808" }} />
          Blog
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
