import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
const DonePatients = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  const appointments = doctor.Appointments || []
  const ellipsis = faEllipsisVertical as IconProp;
  return (
    <div className="DoctorProfile-bottom">
      <div className="DoctorProfile-appointment-requests-list-header">
        <span className="DoctorProfile-appointment-requests-list-header-title">
          Recent Patients
        </span>
        <span className="DoctorProfile-appointment-requests-list-header-view">
          View all &gt;
        </span>
      </div>
      <table className="table table-borderless">
        <thead className="DoctorProfile-patients-done">
          <tr className="table-secondary">
            <th scope="col">Patient Name</th>
            <th scope="col">Visit Id</th>
            <th scope="col">Date</th>
            <th scope="col">Gender</th>
            <th scope="col">Diseases</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            appointments?.map((appo: any, i: number) => appo.isFinished ?
              <tr key={i} >
                <th scope="row" className="DoctorProfile-th">
                  <div className="DoctorProfile-patient-done">
                    <div className="DoctorProfile-image-frame3">
                      <img
                        src={appo.Patient.avatarUrl}
                        alt=""
                      />
                    </div>
                    <div className="DoctorProfile-appointment-requests-list-container-request-details">
                      <span className="DoctorProfile-appointment-requests-list-container-request-details-name">
                        {appo.Patient.name}
                      </span>
                    </div>
                  </div>
                </th>
                <td>{appo.id}</td>
                <td>{appo.date}</td>
                <td>{appo.Patient.gender.toUpperCase()}</td>
                <td>{appo.disease.slice(0, 10)}...</td>
                <td>Out-Patient</td>
                <td>
                  <FontAwesomeIcon icon={ellipsis} />
                </td>
              </tr> : null
            )}
        </tbody>
      </table>
    </div>
  )
}

export default DonePatients