"use client";
import "./style.css";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "./TopNav";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { getOnePatient } from "../../store/patinetSlice";
import { getOneDoctor } from "../../store/doctorSlice";
import { ReduxProvider } from "../../store/provider";
import Overview from "./overview/page";
const DoctorProfile = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
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
    <Overview />
  );
};

export default DoctorProfile;
