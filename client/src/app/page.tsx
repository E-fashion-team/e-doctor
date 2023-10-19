"use client"



import LandingPage from "./landingpage/page";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { getOnePatient } from "../store/patinetSlice";
import { getAllDoctors, getOneDoctor } from "../store/doctorSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; // Adjust the path to your store file

export default function Home() {

  // const router = useRouter(); // Use the Next.js router

 

  // useEffect(() => {
  //   const userType = localStorage.getItem('type');
  //   if (userType === 'patient') {
  //     dispatch(getOnePatient());
  //   } else if (userType === 'doctor') {
  //     dispatch(getOneDoctor());
  //   }
  //   dispatch(getAllDoctors());
  // }, []);









 

  return (




    <div>
      <LandingPage />

    </div>
  );
}