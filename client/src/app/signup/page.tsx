"use client"
import "./style.css";
// import doctorImg from "../../images/back.png";
import Image from 'next/image';
// import back from "../../images/back.png";
// import { useDispatch } from "react-redux";
// import { createPatient } from "../../store/patinetSlice";
// import { AppDispatch } from "../../store/store";
// import { createDoctor } from "../../store/doctorSlice";
// import Link from 'next/link'
import React, { useState, ChangeEvent } from "react";
import {useRouter} from 'next/navigation'
import "./style.css";
// import {toast} from "react-toastify"


const Signup = () => {
    // const dispatch: AppDispatch = useDispatch();
    const navigate = useRouter()

    const [userType, setUserType] = useState("");
    const [showDoctorFields, setShowDoctorFields] = useState(false);
    const [department, setDepartment] = useState("")
    const [papers, setPapers] = useState("")
    const [form, setForm] = useState({
      email: "",
      password: "",
      name: "",
      age: "",
      gender: "",
      phone: "",
    });



    // const handleUserTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //   setUserType(e.target.value);
    //   setShowDoctorFields(e.target.value === "2");
    // };


    // const handleFormChange = (e: any) => {
    //   setForm({ ...form, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e: any) => {
      e.preventDefault();
    //   if (userType === "2") {
    //     //doctor
    //     const x = await dispatch(createDoctor({ ...form, age: +form.age, papers, department }));
    //     if (x.payload.message === "Request failed with status code 500") {
    //       toast.error(`${x.payload.response.data.message}`, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //       });
    //     }else {
    //       router.push("/login")
    //     }
    //   } else if (userType === "1") {
    //     //patient
    //     const x = await dispatch(createPatient({ ...form, age: +form.age }));
    //     if (x.payload.message === "Request failed with status code 500") {
    //       toast.error(`${x.payload.response.data.message}`, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //       });
    //     }else {
            console.log(form)
            // navigate.push("/login")
    //     }
    //   }
    };

  return (
    <div className="allRegisterContainer">
      <div className="signInFormContainer">
        <select
          className="form-select form-select-sm user-type"
          aria-label=".form-select-sm example"
        >
          <option value="">User type</option>
          <option value="1">Patient</option>
          <option value="2">Doctor</option>
        </select>
        <div className="formOutline mb-3">
          <input
           onChange={e => setForm(prev => ({...prev, name: e.target.value}))}
            name="name"
            className="formInput formInputLarge"
            placeholder="Name"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Name
          </label>
        </div>


        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({...prev, age: e.target.value}))}
            name="age"
            className="formInput formInputLarge"
            placeholder="Give Age"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Age
          </label>
        </div>
        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({...prev, gender: e.target.value}))}
            name="gender"
            className="formInput formInputLarge"
            placeholder="Gender"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Gender
          </label>
        </div>
        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({...prev, phone: e.target.value}))}
            name="phone"
            className="formInput formInputLarge"
            placeholder="Enter Phone"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Phone
          </label>
        </div>

        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({...prev, email: e.target.value}))}
            name="email"
            className="formInput formInputLarge"
            placeholder="example@example.com"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Email
          </label>
        </div>
        <div className="formOutline mb-3">
          <input
            // onChange={e => setForm(prev => ({...prev, adress: e.target.value}))}
            name="address"
            className="formInput formInputLarge"
            placeholder="Enter Address"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Address
          </label>
        </div>
        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({...prev, password: e.target.value}))}
            name="password"
            className="formInput formInputLarge"
            placeholder="Enter password"
            type="password"
            id="passwordInput"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Password
          </label>
        </div>
        <div className="formOutline mb-3">
          <input
            // onChange={e => setForm(prev => ({...prev, CIN: e.target.value}))}
            name="cin"
            type="number"
            maxLength={8}
            minLength={8}
            className="formInput formInputLarge"
            placeholder="CIN"
          />
          <label className="formLabel" htmlFor="passwordInput">
            CIN
          </label>
        </div>
          <div>
            <div className="formOutline mb-3">
              <input
                className="formInput formInputLarge"
                placeholder="Enter papers"
                type="password"
                id="papers"
              />
              <label className="formLabel" htmlFor="passwordInput">
                Papers
              </label>
            </div>

            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
            >
              <option selected>Choose your department</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Generalist">Generalist</option>
              <option value="Radiology">Radiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dentistry">Dentistry</option>
              <option value="Surgery">Surgery</option>
            </select>
          </div>
      

        <div className="textCenter mt-4 pt-2">
          <button
            type="button"
            onClick={e => handleSubmit(e)}
            className="btn btnPrimary btnLarge button"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="imageContainer">
        <Image src="{doctorImg} "alt="Doctor" className="doctorImage" />
        <Image src="{back}" alt="back" className="backImage" />

      </div>
    </div>
  );
};

export default Signup;
