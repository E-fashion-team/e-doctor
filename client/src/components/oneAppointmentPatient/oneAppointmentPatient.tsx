"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getOnePatient } from "../../store/patinetSlice";
import { getOneDoctor } from "../../store/doctorSlice";
import axios from "axios";
type Appprops = {
  appo: any;
};

const oneAppointmentPatient = ({ appo }: Appprops) => {
  const [doctor, setDoctor] = useState<string>("");
  console.log(appo, "appo");

  const dispatch: AppDispatch = useDispatch();
  const findDoctor = () => {
    axios
      .get(`http://localhost:5000/api/doctor/${appo.DoctorId}`)
      .then((response) => {
        setDoctor(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(doctor, "ggg");
  useEffect(() => {
    findDoctor();
    dispatch(getOnePatient());
  }, []);

  return (
    <div
      className="appointment-requests-list-container-request-details"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <span className="appointment-requests-list-container-request-details-name">
        Doctor name : {doctor}
      </span>
      <span className="appointment-requests-list-container-request-details-data">
        At :{appo.date.split("_").slice(1).join(":")}
      </span>
      <button style={{ padding: "20px 40px", borderRadius: "40px" }}>
        Pay
      </button>
    </div>
  );
};

export default oneAppointmentPatient;
