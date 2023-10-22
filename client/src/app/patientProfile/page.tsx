"use client";
import React, { useEffect } from "react";
import "./style.css";
import OneAppointment from "../../components/oneAppointmentPatient/oneAppointmentPatient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getOnePatient } from "../../store/patinetSlice";
import { getOneDoctor } from "../../store/doctorSlice";
import Navbar from "@/components/navbar/Navbar";

const AllAppointments = () => {
  const doctor: any = useSelector(
    (state: RootState) => state.doctor.doctorInfo
  );
  const patient: any = useSelector(
    (state: RootState) => state.patient.patientInfo
  );
  console.log(patient, "patient");

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type === "patient") {
      dispatch(getOnePatient());
    } else if (type === "doctor") {
      dispatch(getOneDoctor());
    }
  }, []);

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="appointments-container" style={{ marginTop: "30px" }}>
        {patient.appointments?.map((appo: any, i: number) => (
          <OneAppointment key={i} appo={appo} />
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
