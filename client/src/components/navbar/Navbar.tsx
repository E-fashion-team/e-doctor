"use client";
import "./style.css";

import React from "react";
import logo from "../../images/logo.png";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logoutPatient } from "../../store/patinetSlice";
import { logoutDoctor } from "../../store/doctorSlice";
import Image from "next/image";

const Navbar = () => {
  const navigate = useRouter();
  const doctor = useSelector((state: RootState) => state.doctor);
  const patient = useSelector((state: RootState) => state.patient);
  const dipstach: AppDispatch = useDispatch();
  const pathName = window.location.pathname;
  return (
    <div
      className="navBar"
      style={{ display: pathName.includes("/doctorProfile") ? "none" : "flex" }}
    >
      <div className="nav-logo">
        <Image src={logo} alt="logo" />
        <div className="title-health-care">
          <span className="health-title">Health</span>
          <span className="care">Care</span>
        </div>
      </div>
      <div className="nav-buttons">
        <span className="item" onClick={() => navigate.push("/")}>
          Home
        </span>
        <span className="item" onClick={() => navigate.push("/services")}>
          Service
        </span>
        <span className="item" onClick={() => navigate.push("/contactUs")}>
          Contact us
        </span>
        <span className="item">Help</span>
        <span className="item">Blogs</span>

        {patient.isAuthenticated ? (
          <span className="item" onClick={() => navigate.push("/MapPat")}>
            Map
          </span>
        ) : null}
        {doctor.isAuthenticated ? (
          <span className="item" onClick={() => navigate.push("/Mapdoc")}>
            Map
          </span>
        ) : null}
      </div>
      <div className="nav-last-buutons">
        <button
          onClick={() => {
            !doctor.isAuthenticated && !patient.isAuthenticated
              ? navigate.push("/signup")
              : patient.isAuthenticated
              ? navigate.push("/patientProfile")
              : navigate.push("/doctorProfile");
          }}
        >
          {!doctor.isAuthenticated && !patient.isAuthenticated
            ? "Sign Up"
            : "Profile"}
        </button>
        <button
          onClick={() => {
            doctor.isAuthenticated || patient.isAuthenticated
              ? dipstach(logoutPatient()) && dipstach(logoutDoctor())
              : navigate.push("/login");
          }}
        >
          {doctor.isAuthenticated || patient.isAuthenticated
            ? "Log Out"
            : "Log In"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
