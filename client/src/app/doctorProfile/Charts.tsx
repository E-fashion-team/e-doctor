import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
const Charts = () => {
    const square = faSquare as IconProp;
  return (
    <div className="DoctorProfile-statistics-charts">
            <div
              className="DoctorProfile-statistics-stocks-header"
              style={{ alignItems: "center" }}
            >
              <span className="DoctorProfile-statistics-stocks-header-title">
                Gender
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
            <div className="DoctorProfile-statistics-charts-content">
            
              <div className="DoctorProfile-statistics-charts-labels">
                <FontAwesomeIcon
                  id="DoctorProfile-statistics-charts-labels-male"
                  icon={faSquare}
                />
                <span className="DoctorProfile-statistics-charts-labels-title">
                  Male
                </span>
                <FontAwesomeIcon
                  id="DoctorProfile-statistics-charts-labels-female"
                  icon={faSquare}
                />
                <span className="DoctorProfile-statistics-charts-labels-title">
                  Female
                </span>
              </div>
            </div>
          </div>
  )
}

export default Charts