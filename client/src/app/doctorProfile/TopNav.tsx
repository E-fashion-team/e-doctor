import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const TopNav = () => {
  const question = faCircleQuestion as IconProp;
  const bell = faBell as IconProp;

  return (
    <div className="DoctorProfile-top">
      <div className="DoctorProfile-top-left">
        <input
          className="DoctorProfile-search"
          type="text"
          placeholder="Search Appointment,Patient or etc"
        />
      </div>
      <div className="DoctorProfile-top-right">
        <FontAwesomeIcon
          className="DoctorProfile-main-icon"
          icon={question}
          style={{ color: "white" }}
        />
        <FontAwesomeIcon
          className="DoctorProfile-main-icon"
          icon={bell}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default TopNav;
