import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState as GlobalRootState } from "../store/store";
import { useRouter } from "next/router";


interface RootState {
  doctor: {
    allDoctors: Doctor[];
  };
}
interface Doctor {
  id: number; 
  name: string;
  specialty: string; 
  image: string;
}




var departments :{ [key: string]: { para: string, img: string } } = {
  Neurologist: {
      para: "A neurologist is a medical doctor who specializes in the diagnosis and treatment of disorders that affect the nervous system. The nervous system is a complex network that includes the brain, spinal cord, and peripheral nerves. Neurologists are experts in the management of various neurological conditions",
      img: "https://imgs.search.brave.com/u0Hm7HjRGHNJ9NNAcC2aYGueZ3KqrW6AsgRg1XTL6Uk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/MzU3NTk1OC9waG90/by9uZXVyb2xvZ2lz/dC1zdGFyaW5nLWF0/LXRoZS1wYXRpZW50/LWJyYWluLWltYWdl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9NE9za0JPZHpT/NXVfb3dEeFl5Q045/UWEtVmtnWkZ5YkJk/c0YzQTd0Nko0WT0"
  },
  Dermatology: {
      para: "Dermatology is the medical specialty that focuses on the diagnosis and treatment of conditions related to the skin, hair, nails, and mucous membranes. Dermatologists are medical doctors who are experts in a wide range of skin-related issues. They play a crucial role in maintaining skin health and treating various skin disorders. Here are some of the key areas and conditions",
      img: "https://media.istockphoto.com/id/514880133/photo/dermatologist-examining-patient-for-signs-of-skin-cancer.jpg?s=612x612&w=0&k=20&c=8eOTKwhzQzmVE4zgmgr1Ham6Ge2L9GbLx_-szh_Cn5I="
  },
  Generalist: {
      para: "A generalist, in the context of medicine or healthcare, is a medical doctor who provides comprehensive and primary medical care to patients of all ages. These physicians are often referred to as family doctors or general practitioners. Generalists are trained to diagnose and treat a wide range of medical conditions and provide holistic care for individuals and families.",
      img: "https://ilchiro.org/wp-content/uploads/2019/06/storyblocks-happy-doctor-standing-with-a-laptop_S8lrSrNa-z-1-1280x640.jpg"
  },
  Radiology: {
      para: "A radiologist is a medical doctor who specializes in the use of medical imaging to diagnose and treat diseases and conditions. They are highly trained in interpreting various medical images, such as X-rays, CT scans, MRIs, ultrasounds, and other imaging techniques. Radiologists play a crucial role in healthcare by helping other healthcare providers (such as primary care physicians and specialists) make accurate diagnoses and treatment plans",
      img: "https://media.istockphoto.com/id/1388388697/photo/medical-science-hospital-confident-black-female-neurologist-neuroscientist-neurosurgeon-looks.jpg?s=612x612&w=0&k=20&c=AiPLlUF5GS5E7cKEOYDul0IN4q__6OL6NBl02gZYwHI="
  },
  Dentistry: {
      para: "A dentist is a healthcare professional who specializes in the diagnosis, treatment, and prevention of oral health issues. Dentists primarily focus on the mouth, teeth, gums, and related structures. They play a crucial role in maintaining and improving oral health, as well as the overall well-being of their patients",
      img: "https://img.freepik.com/free-photo/smiling-young-man-sitting-dentist-chair-while-doctor-examining-his-teeth_158595-7733.jpg"
  },
  Surgery: {
      para: "Surgery is a medical specialty that involves the use of manual or instrumental techniques to investigate and treat medical conditions and diseases through operative procedures. Surgeons are medical doctors who have undergone extensive training to perform a wide range of surgical procedures. Surgery is an integral part of modern medicine and plays a crucial role in diagnosing, treating, and sometimes preventing a variety of medical conditions",
      img: "https://globalnews.ca/wp-content/uploads/2019/06/operation.jpg?quality=85&strip=all"
  },
  Gynecologist: {
      para: "A gynecologist is a medical doctor who specializes in the female reproductive system, including the uterus, ovaries, fallopian tubes, and breasts. They provide medical care and advice related to women's health, particularly focusing on the female reproductive system and related conditions",
      img: "https://as1.ftcdn.net/v2/jpg/02/31/46/24/1000_F_231462476_GsVrMkd6X9N711Qnt1KaWanVOdjPE9aK.jpg"
  },
  Orthopedics: {
      para: "Orthopedics, also known as orthopedic surgery, is a medical specialty that focuses on the diagnosis, treatment, and prevention of musculoskeletal conditions. Orthopedic surgeons are medical doctors who specialize in the management of various issues related to the musculoskeletal system, including the bones, joints, muscles, ligaments, tendons, and other connective tissues",
      img: "https://www.valleycountyhealthsystem.org/assets/site/images/Orthopedic.png"
  },
}

const LandingPage = () => {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("token");
  const { allDoctors } = useSelector((state: RootState) => state.doctor);

  const handleDepartmentClick = (department: string) => {
    setDepartment(department);
  };

  const handleDoctorClick = (name: string) => {
    setName(name);
    router.push(`/doctors/${name}`);
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-container-child-1">
        <div className="sub1-child-1">
          <h1>Welcome to our clinic</h1>
          <p>
            We provide high-quality medical care to our patients. Our team of
            experienced doctors and staff are dedicated to your health and
            well-being.
          </p>
        </div>
        <div className="sub1-child-2">
          <h2>Departments</h2>
          <div className="departments-container">
            {Object.keys(departments).map((department) => (
              <div
                key={department}
                className={`department ${
                  department === department ? "active" : ""
                }`}
                onClick={() => handleDepartmentClick(department)}
              >
                {department}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="landing-page-container-child-2">
        <h2>Our Doctors</h2>
        <div className="doctors-container">
          {allDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`doctor ${
                name === doctor.name ? "active" : ""
              }`}
              onClick={() => handleDoctorClick(doctor.name)}
            >
              <img src={doctor.image} alt={doctor.name} />
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;