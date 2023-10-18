"use client";
import "./style.css";
import React, { useState, useEffect } from "react";
import Doctor from "../../images/image 17.png";
import { useDispatch, useSelector } from "react-redux";
import CardService from "@/components/cardservice/cardservice/CardService";
import { AppDispatch, RootState } from "../../store/store";
import TeamMember from "@/components/cardservice/teammembercard/TeamMemberCard";
import container from "../../images/Container.png";
import Image from "next/image";
import Link from "next/link";
import { getAllDoctors } from "@/store/doctorSlice";

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

const LandingPage = () => {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    dispatch(getAllDoctors());
  }, []);
  const { allDoctors } = useSelector((state: RootState) => state.doctor);

  return (
    <div className="landing-page-container">
      <div className="landing-page-container-child-1">
        <div className="sub1-child-1">
          <div className="texts">
            <div className="sous-text">
              <div className="sub-texts">
                Providing Quality{" "}
                <span style={{ color: "#007E85" }}>Healthcare</span> for a{" "}
                <br />
                <span style={{ color: "#6EAB36" }}>Brighter</span> and{" "}
                <span style={{ color: "#6EAB36" }}>Healthy</span> Future
              </div>
              <p className="paragraph">
                At our hospital, we are dedicated to providing exceptional
                medical care to our patients and their families. Our experienced
                team of medical professionals, cutting-edge technology, and
                compassionate approa ch make us a leader in the healthcare
                industry
              </p>
            </div>
            <div className="texts-buttons">
              <div className="texts-buttons-btn1">Appointements</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="51"
                height="51"
                viewBox="0 0 51 51"
                fill="none"
              >
                <circle cx="25.5" cy="25.5" r="25.5" fill="#007E85" />
                <path
                  d="M34.5 24.634C35.1667 25.0189 35.1667 25.9811 34.5 26.366L21.75 33.7272C21.0833 34.1121 20.25 33.631 20.25 32.8612L20.25 18.1388C20.25 17.369 21.0833 16.8879 21.75 17.2728L34.5 24.634Z"
                  fill="white"
                />
              </svg>
              <div>Watch Video</div>
            </div>
          </div>
          <div className="image-docotor-wrapper">
            <Image className="image-docotor" src={Doctor} alt="doc" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="520"
              height="548"
              viewBox="0 0 520 548"
              fill="none"
            >
              <path
                d="M371.861 69.4458C407.056 98.7392 437.929 129.716 463.554 167.091C489.178 204.802 510.172 248.91 517.273 297.732C524.374 346.555 517.582 399.754 497.205 447.903C477.138 495.716 437.796 488.481 395.5 507C363.5 529 316 548 263.5 548C214 548 182 545 139 522C102 490.5 41.5208 478.544 18.9835 441.506C-3.86244 404.468 0.151041 348.912 0.459771 293.355C0.7685 238.135 -2.62753 182.579 14.97 136.114C32.5676 89.6481 71.1588 52.2738 114.998 28.3677C158.838 4.46155 208.235 -5.63964 252.692 3.11472C297.149 12.2058 336.666 40.1524 371.861 69.4458Z"
                fill="url(#paint0_linear_47_34)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_47_34"
                  x1="260"
                  y1="0"
                  x2="260"
                  y2="548"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#007E85" />
                  <stop offset="1" stopColor="#2B8500" stopOpacity="0.49" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="sub2-child-1 find-doctor m-5">
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
            {/* <Link to="/services" state={{ department, name }}>
                            <div
                                className="serach-input">
                                Search
                            </div>
                        </Link> */}
            <div className="serach-input">Search</div>
          </div>
        </div>
      </div>
      <div className="landing-page-container-child-2 d-flex">
        <span>Our results in numbers</span>
        <div className="d-flex justify-content-evenly w-100">
          <div className="wrapper">
            <span>99%</span>
            <span>Customer satisfaction</span>
          </div>
          <div className="wrapper">
            <span>15K</span>
            <span>Online Patients</span>
          </div>
          <div className="wrapper">
            <span>12K</span>
            <span>Patients Recovered</span>
          </div>
          <div className="wrapper">
            <span>99%</span>
            <span>Company growth</span>
          </div>
        </div>
      </div>
      <div className="landing-page-container-child-3 d-flex flex-row">
        <div className="d-flex flex-column align-items-center justify-content-center w-50 gap-5">
          <span
            style={{ color: "#007E85", fontSize: "2.25rem", fontWeight: "700" }}
          >
            You have lots of reasons <br /> to choose us
          </span>
          <span style={{ color: "#555", fontWeight: "400" }}>
            Lorem ipsum dolor sit amet consectetur adipiscing eli <br /> mattis
            sit phasellus mollis sit aliquam sit nullam.
          </span>
          <div className="d-flex gap-4">
            <div
              style={{
                color: "#fff",
                borderRadius: "2.5rem",
                backgroundColor: "#007E85",
                padding: "1rem 2.25rem",
              }}
            >
              Get Satrted
            </div>
            <div
              style={{
                color: "#007E85",
                borderRadius: "2.5rem",
                backgroundColor: "#fff",
                padding: "1rem 2.25rem",
              }}
            >
              Talk to sales
            </div>
          </div>
        </div>
        <div>
          <Image src={container} alt="conatiner" />
        </div>
      </div>
      <div className="landing-page-container-child-4 mt-4">
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
      <div className="landing-page-container-child-5 mt-4">
        <div className="mb-5">
          <span
            style={{ color: "#007E85", fontSize: "2.25rem", fontWeight: "700" }}
          >
            Meet our team members
          </span>
          <p style={{ color: "#555", fontWeight: "400" }}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit semp er
            <br /> dalar elementum tempus hac tellus libero accumsan.{" "}
          </p>
        </div>
        <div
          style={{ padding: "0rem 4rem 1rem 7rem" }}
          className="all-services-cards-container d-flex  flex-wrap gap-4 w-100"
        >
          {allDoctors?.map((doctor: object, i: number) => (
            <TeamMember key={i} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

// hello
