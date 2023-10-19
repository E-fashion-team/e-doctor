"use client"



import LandingPage from "./landingpage/page";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getOnePatient } from "../store/patinetSlice";
import { getAllDoctors, getOneDoctor } from "../store/doctorSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; // Adjust the path to your store file

export default function Home() {
<<<<<<< HEAD
 
  // const router = useRouter(); // Use the Next.js router
=======
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch from your store

  const doctor = useSelector((state: RootState) => state.doctor);
  const patient = useSelector((state: RootState) => state.patient);
>>>>>>> 3bf7991ec295111d59f4b5142fb1d86d657e4fe7


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
<<<<<<< HEAD
    <div> 
      <LandingPage  />
=======
    <div>
      <LandingPage />
>>>>>>> 3bf7991ec295111d59f4b5142fb1d86d657e4fe7
    </div>
  );
}








