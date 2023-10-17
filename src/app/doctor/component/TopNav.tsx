// components/TopNav.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faBell } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../store/store';

interface PatientInfo {
  avatarUrl: string;
  name: string;
}

const TopNav = () => {
  const question = faCircleQuestion as IconProp;
  const bell = faBell as IconProp;
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo);

  return (
    <div className="DoctorProfile-top">
      <div className="DoctorProfile-top-left">
        <input className="DoctorProfile-search" type="text" placeholder="Search Appointment, Patient or etc" />
      </div>
      <div className="DoctorProfile-top-right">
        <FontAwesomeIcon className="DoctorProfile-main-icon" icon={question} style={{ color: "white" }} />
        <FontAwesomeIcon className="DoctorProfile-main-icon" icon={bell} style={{ color: "white" }} />
        <div className="DoctorProfile-user">
          <div className="DoctorProfile-image-frame">
            <Image
              src={patient.avatarUrl || doctor.avatarUrl } // Define a default avatar if needed
              alt=""
              width={50}
              height={50}
            />
          </div>
          <div className="DoctorProfile-details">
            <span className="DoctorProfile-name">{patient.name || doctor.name}</span>
            <span>{doctor.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
