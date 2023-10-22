"use client"
import "./style.css";
import doctorImg from "../../images/image 17.png";
import Image from 'next/image';
import back from "../../images/back.png";
import { useDispatch } from "react-redux";
import { createPatient } from "../../store/patinetSlice";
import { AppDispatch } from "../../store/store";
import { createDoctor } from "../../store/doctorSlice";
// import Link from 'next/link'
import React, { useState, ChangeEvent, useRef } from "react";
import { useRouter } from 'next/navigation'
import "./style.css";
import { toast } from "react-toastify"
import imgPlaceHolder from '../../images/palceUser.jpg'
import axios from 'axios'
import Loading from '../../components/loading/loading'


const Signup = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter()

  const [userType, setUserType] = useState("");
  const [showDoctorFields, setShowDoctorFields] = useState(false);
  const [department, setDepartment] = useState("")
  const [papers, setPapers] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
    cin: "",
    papers: "",
    address: "",
    department: "",
    avatarUrl: "",
  });


  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset","oztadvnr")
        const response = await axios.post("https://api.cloudinary.com/v1_1/dl4qexes8/upload",formData)        
        console.log(response.data.secure_url)
        setForm((prev: any) => ({ ...prev, avatarUrl: response.data.secure_url}))
        }
    }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userType === "2") {
      //doctor
      const x = await dispatch(createDoctor({...form, age: Number(form.age), phone: Number(form.phone)}));
      if (x.payload.message === "Request failed with status code 500") {
        toast.error(`${x.payload.response.data.message}`, {
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
        navigate.push("/login")
      }
    } else if (userType === "1") {
      //patient
      const patientForm = {
        email: form.email,
        password: form.password,
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        phone: Number(form.phone),
        cin: form.cin,
        address: form.address,
        avatarUrl: form.avatarUrl
      }
      const x = await dispatch(createPatient(patientForm));
      if (x.payload.message === "Request failed with status code 500") {
        toast.error(`${x.payload.response.data.message}`, {
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
        setLoading(true)
        navigate.push("/login")
        setLoading(false)
      }
    }
  };

  if(loading) return <Loading/>

  return (
    <div className="allRegisterContainer">
      <div className="signInFormContainer">
        <div className="imgInputContainer">
        <input
          name="avatarUrl"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
          {
            form.avatarUrl
            ? <Image 
            src={form.avatarUrl}
            onClick={handleImageUpload}
            style={{ cursor: 'pointer' }}
            alt=''
            width={150}
            height={150}
            />
            : <Image 
            src={imgPlaceHolder}
            onClick={handleImageUpload}
            style={{ cursor: 'pointer' }}
            alt=''
            />
          }
        </div>
        <select
          onChange={e => setUserType(e.target.value)}
          className="form-select form-select-sm user-type"
          aria-label=".form-select-sm example"
        >
          <option value="">User type</option>
          <option value="1">Patient</option>
          <option value="2">Doctor</option>
        </select>
        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
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
            onChange={e => setForm(prev => ({ ...prev, age: e.target.value }))}
            type="number"
            name="age"
            className="formInput formInputLarge"
            placeholder="Give Age"
          />
          <label className="formLabel" htmlFor="passwordInput">
            Age
          </label>
        </div>
        <div className="formOutline mb-3">
          <select
          className="form-select form-select-sm"
          name="gender"
          onChange={e => setForm(prev => ({ ...prev, gender: e.target.value }))}>
            <option value="">Select your gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="formOutline mb-3">
          <input
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            type="number"
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
            onChange={ e => setForm(prev => ({ ...prev, email: e.target.value }))}
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
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
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
            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
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
            onChange={e => setForm(prev => ({ ...prev, cin: e.target.value }))}
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
          {userType === '2' 
          ? <div className="formOutline mb-3">
          <input
          onChange={e => setForm(prev => ({ ...prev, papers: e.target.value }))}
          className="formInput formInputLarge"
          placeholder="Enter papers"
          type="text"
          id="papers"
        />
        <label className="formLabel">
          Papers
        </label>
          </div>
        : null
        }
          {userType === '2' 
          ? <select
          onChange={e => setForm(prev => ({ ...prev, department: e.target.value }))}
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option value="">Choose your department</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Generalist">Generalist</option>
          <option value="Radiology">Radiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Dentistry">Dentistry</option>
          <option value="Surgery">Surgery</option>
        </select> 
        : null
        }
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
        <Image src={doctorImg} alt="Doctor" className="doctorImage" />
        <Image src={back} alt="back" className="backImage" />

      </div>
    </div>
  );
};

export default Signup;

// if (res.status === 200) {
//   setForm({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       topic: '',
//       message: ''
//   })
//   setNotif(true)
//   setTimeout(() => {
//       setNotif(false)
//   }, 3000)
//   toast.success('Your email Was sent Successfully 📨', {
//       icon: false,
//       style: {
//           position: 'fixed',
//           right: '30px',
//           top: '100px',
//           height: '50px',
//           color: 'white',
//           backgroundColor: '#007e85',
//           borderRadius: '10px',
//           padding: '20px'
//       },
//       className: 'custom-toast-container',
//       closeButton: false,
//   });
// } else {
//   setNotif(true)
//   setTimeout(() => {
//       setNotif(false)
//   }, 3000)
//   toast.error("Something went wrong, your email wasn't sent", {
//       icon: false,
//       style: {
//           position: 'fixed',
//           right: '30px',
//           top: '100px',
//           height: '50px',
//           color: 'white',
//           backgroundColor: '#007e85',
//           borderRadius: '10px',
//           padding: '20px'
//       },
//       className: 'custom-toast-container',
//       closeButton: false,
//   });
  
// }
