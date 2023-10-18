"use client"


// import { RootState } from "../../store/store";
import LandingPage from "./landingpage/page";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getOnePatient } from "../store/patinetSlice";
import { getAllDoctors, getOneDoctor } from "../store/doctorSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; // Adjust the path to your store file

export default function Home() {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch from your store

  const doctor = useSelector((state: RootState) => state.doctor);
  const patient = useSelector((state: RootState) => state.patient);


  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType === 'patient') {
      dispatch(getOnePatient());
    } else if (userType === 'doctor') {
      dispatch(getOneDoctor());
    }
    dispatch(getAllDoctors());
  }, []);
  // The rest of your code remains the same

  return (
    <div>
      <LandingPage />
    </div>
  );
}








