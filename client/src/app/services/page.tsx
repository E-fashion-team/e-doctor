"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import hospital from "../../images/hospital.png";
import Calendar from "react-calendar";
import CardService from "../../components/cardservice/cardservice/CardService";
import LeadingMedicine from "../../components/LeadingMedicine/leandingMedicine";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./style.css";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
var obj = {
  Neurologist: {
    para: "A neurologist is a medical doctor who specializes in the diagnosis and treatment of disorders that affect the nervous system. The nervous system is a complex network that includes the brain, spinal cord, and peripheral nerves. Neurologists are experts in the management of various neurological conditions",
    img: "https://imgs.search.brave.com/u0Hm7HjRGHNJ9NNAcC2aYGueZ3KqrW6AsgRg1XTL6Uk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/MzU3NTk1OC9waG90/by9uZXVyb2xvZ2lz/dC1zdGFyaW5nLWF0/LXRoZS1wYXRpZW50/LWJyYWluLWltYWdl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9NE9za0JPZHpT/NXVfb3dEeFl5Q045/UWEtVmtnWkZ5YkJk/c0YzQTd0Nko0WT0",
  },
  Dermatology: {
    para: "Dermatology is the medical specialty that focuses on the diagnosis and treatment of conditions related to the skin, hair, nails, and mucous membranes. Dermatologists are medical doctors who are experts in a wide range of skin-related issues. They play a crucial role in maintaining skin health and treating various skin disorders. Here are some of the key areas and conditions",
    img: "https://media.istockphoto.com/id/514880133/photo/dermatologist-examining-patient-for-signs-of-skin-cancer.jpg?s=612x612&w=0&k=20&c=8eOTKwhzQzmVE4zgmgr1Ham6Ge2L9GbLx_-szh_Cn5I=",
  },
  Generalist: {
    para: "A generalist, in the context of medicine or healthcare, is a medical doctor who provides comprehensive and primary medical care to patients of all ages. These physicians are often referred to as family doctors or general practitioners. Generalists are trained to diagnose and treat a wide range of medical conditions and provide holistic care for individuals and families.",
    img: "https://ilchiro.org/wp-content/uploads/2019/06/storyblocks-happy-doctor-standing-with-a-laptop_S8lrSrNa-z-1-1280x640.jpg",
  },
  Radiology: {
    para: "A radiologist is a medical doctor who specializes in the use of medical imaging to diagnose and treat diseases and conditions. They are highly trained in interpreting various medical images, such as X-rays, CT scans, MRIs, ultrasounds, and other imaging techniques. Radiologists play a crucial role in healthcare by helping other healthcare providers (such as primary care physicians and specialists) make accurate diagnoses and treatment plans",
    img: "https://media.istockphoto.com/id/1388388697/photo/medical-science-hospital-confident-black-female-neurologist-neuroscientist-neurosurgeon-looks.jpg?s=612x612&w=0&k=20&c=AiPLlUF5GS5E7cKEOYDul0IN4q__6OL6NBl02gZYwHI=",
  },
  Dentistry: {
    para: "A dentist is a healthcare professional who specializes in the diagnosis, treatment, and prevention of oral health issues. Dentists primarily focus on the mouth, teeth, gums, and related structures. They play a crucial role in maintaining and improving oral health, as well as the overall well-being of their patients",
    img: "https://img.freepik.com/free-photo/smiling-young-man-sitting-dentist-chair-while-doctor-examining-his-teeth_158595-7733.jpg",
  },
  Surgery: {
    para: "Surgery is a medical specialty that involves the use of manual or instrumental techniques to investigate and treat medical conditions and diseases through operative procedures. Surgeons are medical doctors who have undergone extensive training to perform a wide range of surgical procedures. Surgery is an integral part of modern medicine and plays a crucial role in diagnosing, treating, and sometimes preventing a variety of medical conditions",
    img: "https://globalnews.ca/wp-content/uploads/2019/06/operation.jpg?quality=85&strip=all",
  },
  Gynecologist: {
    para: "A gynecologist is a medical doctor who specializes in the female reproductive system, including the uterus, ovaries, fallopian tubes, and breasts. They provide medical care and advice related to women's health, particularly focusing on the female reproductive system and related conditions",
    img: "https://as1.ftcdn.net/v2/jpg/02/31/46/24/1000_F_231462476_GsVrMkd6X9N711Qnt1KaWanVOdjPE9aK.jpg",
  },
  Orthopedics: {
    para: "Orthopedics, also known as orthopedic surgery, is a medical specialty that focuses on the diagnosis, treatment, and prevention of musculoskeletal conditions. Orthopedic surgeons are medical doctors who specialize in the management of various issues related to the musculoskeletal system, including the bones, joints, muscles, ligaments, tendons, and other connective tissues",
    img: "https://www.valleycountyhealthsystem.org/assets/site/images/Orthopedic.png",
  },
};
interface routerType extends AppRouterInstance {
  query?: queryType;
}
interface queryType {
  name: string;
  department: string;
}

const ServicePage = () => {
  const router: routerType = useRouter();
  const query = router.query;
  console.log(query, "query");

  const [department, setDepartment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState("");
  const [filtredDoctors, setFiltredDoctors] = useState([]);
  console.log(filtredDoctors);
  const handleByDepartment = async (department: string, name: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/doctor/departmentFilter`,
        { department, name }
      );
      setFiltredDoctors(response.data);
      if (response.data.length > 0) {
        window.scrollTo(0, 3000);
      } else {
        toast.info("No Doctors Available ", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterDoctors = async (department: string, time: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctor/getAvailable",
        { department, time }
      );
      setFiltredDoctors(res.data);
      if (res.data.length > 0) {
        window.scrollTo(0, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query?.department && query?.name) {
      handleByDepartment(query?.department as string, query?.name as string);
    }
  }, []);
  return (
    <div className="services-page-conatiner">
      <div className="services-hospital-image-wrapper">
        <Image
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={hospital}
          alt="hospital*image"
        />
        <div className="absolute-div-wrapper">
          <div className="make-the-best-hosptial mt-4">
            <span
              style={{ color: "#fff", fontSize: "2rem", fontWeight: "900" }}
            >
              Meet The Best Hospital
            </span>
            <span
              className="d-flex gap-4"
              style={{ color: "#fff", fontWeight: "200" }}
            >
              We know how large Objects
              <br /> will act but things on a small scale
            </span>
            <div className="make-the-best-hosptial-buttons d-flex gap-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  color: "#fff",
                  background: "#007e85",
                  padding: "1rem 3rem",
                  borderRadius: "2.5rem",
                }}
              >
                Get Quote Now
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  color: "#fff",
                  background: "transparent",
                  padding: "1rem 3rem",
                  borderRadius: "2.5rem",
                  border: "0.1rem solid #007e85",
                }}
              >
                Get Quote Now
              </div>
            </div>
          </div>
          <div className="book-appointment">
            <div className="book-appointment-warrper-child">
              <div className="d-flex flex-column align-items-center gap-4">
                <span
                  style={{ color: "#000", fontSize: "2rem", fontWeight: "900" }}
                >
                  Book Appointment
                </span>
                <div className="w-100 d-flex flex-column align-items-start gap-2">
                  <span>Name *</span>
                  <input
                    placeholder="Full Name"
                    className=" formInput input-service-book-appointment"
                    type="text"
                  />
                </div>
                <div className="w-100 d-flex flex-column align-items-start gap-2">
                  <span>Email address *</span>
                  <input
                    placeholder="example@gmail.com"
                    className="formInput input-service-book-appointment"
                    type="text"
                  />
                </div>
                <div className="w-100 d-flex flex-column align-items-start gap-2">
                  <span>Departement * </span>
                  <select
                    onChange={(e: any) => setDepartment(e.target.value)}
                    className="form-select form-select-xl"
                    aria-label=".form-select-sm"
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
                <div className="w-100 d-flex flex-column align-items-start gap-2">
                  <span>Time *</span>

                  <select
                    onChange={(e: any) => setTime(e.target.value)}
                    className="form-select form-select-xl"
                    aria-label=".form-select-sm"
                  >
                    <option selected>Take Time</option>
                    <option value="TIME_08_00">08:00 </option>
                    <option value="TIME_09_00">09:00 </option>
                    <option value="TIME_10_00">10:00 </option>
                    <option value="TIME_11_00">11:00 </option>
                    <option value="TIME_13_00">13:00 </option>
                    <option value="TIME_14_00">14:00 </option>
                    <option value="TIME_15_00">15:00 </option>
                    <option value="TIME_16_00">16:00 </option>
                  </select>
                </div>
                <div
                  onClick={() => handleFilterDoctors(department, time)}
                  className="d-flex btn-service-book-appointement w-80"
                  style={{
                    padding: "0.9rem 2.5rem",
                    borderRadius: "0.3125rem",
                    background: "#007E85",
                    color: "#fff",
                  }}
                >
                  Book Appointment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-find-doctor" style={{ padding: "0rem 5rem" }}>
        <div className="sub2-child-1 find-doctor w-100">
          <div className="find-A-Doctor">Find A doctor</div>
          <div className="find-A-Doctor-inputs">
            <div className="d-flex gap-4">
              <input
                placeholder="Name"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <input
                placeholder="Department"
                onChange={(e: any) => {
                  setDepartment(e.target.value);
                }}
              />
            </div>
            <div
              className="serach-input"
              onClick={() => {
                handleByDepartment(department, name);
              }}
            >
              Search
            </div>
          </div>
        </div>
      </div>
      <div className="service-landing-page-container-child-4 mt-4">
        <div className="mb-5">
          <span
            style={{ color: "#007E85", fontSize: "2.25rem", fontWeight: "700" }}
          >
            Services we provide
          </span>
          <p style={{ color: "#555", fontWeight: "400" }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit semp er
            <br /> dalar elementum tempus hac tellus libero accumsan.{" "}
          </p>
        </div>
        <div
          style={{ padding: "0rem 4rem 1rem 7rem" }}
          className="all-services-cards-container d-flex justify-content-between  flex-wrap  w-100"
        >
          <CardService
            title="Neurologist"
            para={obj.Neurologist.para}
            img={obj.Neurologist.img}
          />
          <CardService
            title="Dentistry"
            para={obj.Dentistry.para}
            img={obj.Dentistry.img}
          />
          <CardService
            title="Generalist"
            para={obj.Generalist.para}
            img={obj.Generalist.img}
          />
          <CardService
            title="Gynecologist"
            para={obj.Gynecologist.para}
            img={obj.Gynecologist.img}
          />
          <CardService
            title="Orthopedics"
            para={obj.Orthopedics.para}
            img={obj.Orthopedics.img}
          />
          <CardService
            title="Radiology"
            para={obj.Radiology.para}
            img={obj.Radiology.img}
          />
          <CardService
            title="Surgery"
            para={obj.Surgery.para}
            img={obj.Surgery.img}
          />
          <CardService
            title="Dermatology"
            para={obj.Dermatology.para}
            img={obj.Dermatology.img}
          />
          <CardService
            title="Neurologist"
            para={obj.Neurologist.para}
            img={obj.Neurologist.img}
          />
        </div>
      </div>
      <div className="service-landing-page-container-child-4 mt-4 mb-5">
        <div className="mb-5">
          <span
            style={{ color: "#007E85", fontSize: "2.25rem", fontWeight: "700" }}
          >
            Leading Medicine
          </span>
          <p style={{ color: "#555", fontWeight: "400" }}>
            Problems trying to reslove the conflict betwenn the two major realms
            of Classical physics Newtonian mechanics{" "}
          </p>
        </div>
        <div
          style={{ padding: "0rem 4rem 1rem 7rem" }}
          className="all-leading-cards-container d-flex flex-wrap gap-4 "
        >
          {filtredDoctors.map((doctor: any, i: any) => (
            <LeadingMedicine key={i} doctor={doctor} date={time} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
