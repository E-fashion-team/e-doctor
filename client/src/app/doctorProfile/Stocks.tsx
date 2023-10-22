import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const Stocks = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  const appointments = doctor.Appointments
  const user = faUser as IconProp;
  const trendUp = faArrowTrendUp as IconProp;
  return (
    <div className="DoctorProfile-statistics-stocks">
      <div className="DoctorProfile-statistics-stocks-header">
        <span className="DoctorProfile-statistics-stocks-header-title">
          Patients
        </span>
        <select
          className="DoctorProfile-statistics-stocks-header-select"
          name=""
          id=""
        >
          <option value="">2018</option>
          <option value="">2019</option>
          <option value="">2020</option>
          <option value="">2021</option>
          <option value="">2022</option>
        </select>
      </div>
      <div className="DoctorProfile-statistics-stocks-container">
        <div className="DoctorProfile-statistics-stock">
          <div className="DoctorProfile-stock-icon-container">
            <FontAwesomeIcon
              className="DoctorProfile-stock-icon"
              icon={user}
              style={{ color: "rgb(26, 88, 244)" }}
            />
          </div>
          <div className="DoctorProfile-statistics-stock-details">
            <span className="DoctorProfile-statistics-stock-details-data">
              {appointments?.filter((appo: any) => !appo.isFinished).length}
            </span>
            <span className="DoctorProfile-statistics-stock-details-title">
              New Patient
            </span>
          </div>
          <div className="DoctorProfile-statistics-stock-data">
            <FontAwesomeIcon
              className="DoctorProfile-statistics-stock-data-icon"
              icon={trendUp}
              style={{ color: "blueviolet" }}
            />
            <span className="DoctorProfile-statistics-stock-data-value">
              15%
            </span>
          </div>
        </div>
        <div className="DoctorProfile-statistics-stock">
          <div className="DoctorProfile-stock-icon-container2">
            <FontAwesomeIcon
              className="DoctorProfile-stock-icon"
              icon={user}
              style={{ color: "orange" }}
            />
          </div>
          <div className="DoctorProfile-statistics-stock-details">
            <span className="DoctorProfile-statistics-stock-details-data">
            {appointments?.filter((appo: any) => appo.isFinished).length}
            </span>
            <span className="DoctorProfile-statistics-stock-details-title">
              Old Patient
            </span>
          </div>
          <div className="DoctorProfile-statistics-stock-data">
            <FontAwesomeIcon
              className="DoctorProfile-statistics-stock-data-icon"
              icon={trendUp}
              style={{ color: "blueviolet" }}
            />
            <span className="DoctorProfile-statistics-stock-data-value">
              15%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stocks