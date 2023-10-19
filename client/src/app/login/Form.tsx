"use client"

import React, { useState } from "react";
import "./style.css";
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { doctorLogin } from "../../store/doctorSlice";
import { loginPatient } from "../../store/patinetSlice";
import { useRouter } from "next/navigation";
import { getOneDoctor } from "../../store/doctorSlice";
import { getOnePatient } from "../../store/patinetSlice";
import { toast } from "react-toastify";

function Form() {
  const user = useSelector((state: RootState) => state.doctor);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");



  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (userType === "doctor") {
        const res = await dispatch(doctorLogin({email, password}));
        console.log(res.payload.token)
        if (res.payload.token) {
          navigate.push("/");
          dispatch(getOneDoctor())
          toast.success("Welcome", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
          );
        } else {
          toast.error("Wrong Password Or Email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
      else if (userType === "patient") {
        const res = await dispatch(
          loginPatient({
            email,
            password,
          })
        );
        if (res.payload.token) {
          dispatch(getOnePatient())
          navigate.push("/");
          toast.success("Welcome", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Wrong Password Or Email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signIn">
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start gap-4">
        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
        <a href="https://www.facebook.com">
          <img
            src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-white-f.png"
            alt="facebbok"
            width={25}
          />
        </a>
        <a href="https://www.google.com">
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            alt="google"
            width={25}
          />
        </a>
      </div>
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Or</p>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
        <input
          type="email"
          id="form3Example3"
          className="form-control form-control-lg"
          placeholder="Enter a valid email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
        <input
          type="password"
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check mb-0">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3"
          />
          <label className="form-check-label" htmlFor="form2Example3">
            Remember me
          </label>
        </div>
        <a href="#!" className="text-body">
          Forgot password?
        </a>
      </div>
      <div>
        <select required onChange={(e: any) => setUserType(e.target.value)}>
          <option value="">Choose One Please </option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          onClick={(e) => handleSubmit(e)}
        >
          Log In
        </button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Don't have an account?{" "}
          <a href="#!" className="link-danger">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Form;
