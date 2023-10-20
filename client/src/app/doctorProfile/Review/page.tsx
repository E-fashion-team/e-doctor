import React, { useEffect, useState } from "react";
import './review.css'
import YasBar from "../YasBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getOnePatient } from "../../../store/patinetSlice";
import { getOneDoctor } from "../../../store/doctorSlice";

const Review = () => {
    const dispatch: AppDispatch = useDispatch()
    // useEffect(() => {
    //     const type = localStorage.getItem("type")
    //     if (type === "patient") {
    //         dispatch(getOnePatient())
    //     } else if (type === "doctor") {
    //         dispatch(getOneDoctor())
    //     }
    // },[])
    const [job, setJob] = useState("")
    const [profilePhoto] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU")
    const [name, setName] = useState("")
    const [rate, setRate] = useState(0)
    const [star, setStar] = useState(0)
    const [trust, setTrust] = useState<number>(25)

    const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
    const allReviwes: any = useSelector((state: RootState) => state.doctor.allReviwes);
    // useEffect(() => {
    //     const resTrust = +(allReviwes.reduce((acc: number, elm: any) => acc + +elm.rate, 0) / allReviwes.length * 5).toFixed(0)
    //     setTrust(resTrust)
    //     const resStar = +(allReviwes.reduce((acc: number, elm: any) => acc + +elm.rate, 0) / allReviwes.length).toFixed(0)
    //     setStar(resStar)
    // }, [])


    return (
        <div style={{ marginTop: "2rem" }}>
            <div className="title-place-yassine">
                <h2 style={{ textAlign: "left" }}>My Profile</h2>
            </div>
            <div className="father-container-yassine">
                <div className="profil-dr-pt">
                    <div id="carouselExampleControls" className="carousel slide text-center carousel-dark profile-section" data-mdb-ride="carousel">
                        <div className="carousel-inner son-of-father ">
                            <div className="carousel-item active profile-card p-5"
                            >
                                <div style={{ width: "13rem", height: "11rem" }}>

                                    <img className="rounded-circle shadow-1-strong mb-4"
                                        src={doctor.avatarUrl} alt="avatar"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div className="row d-flex justify-content-center profile-section">
                                    <div className="col-lg-8 profile-section">
                                        <h5 className="mb-3">{doctor.name}</h5>
                                        <p>{doctor.department}</p>
                                        <div className="boutouna d-flex align-items-center gap-3"><i className="fa-solid fa-pencil"></i> Edit</div><br />
                                        <p style={{ fontWeight: "bold", fontSize: "1rem" }}>146 Rates</p>
                                    </div>
                                </div>
                                <ul className="list-unstyled d-flex justify-content-center text-warning mb-3">
                                    <li><i className={star >= 1 ? "fas fa-star fa-sm" : "far fa-star fa-sm"}></i></li>
                                    <li><i className={star >= 2 ? "fas fa-star fa-sm" : "far fa-star fa-sm"}></i></li>
                                    <li><i className={star >= 3 ? "fas fa-star fa-sm" : "far fa-star fa-sm"}></i></li>
                                    <li><i className={star >= 4 ? "fas fa-star fa-sm" : "far fa-star fa-sm"}></i></li>
                                    <li><i className={star >= 5 ? "fas fa-star fa-sm" : "far fa-star fa-sm"}></i></li>
                                </ul>
                                <div className="d-flex justify-content-between mb-2">
                                    <div>Trust</div>
                                    <div>{trust}%</div>
                                </div>
                                <div className="progress " style={{ width: "100%" }}>
                                    <div className="progress-bar  bg-success" role="progressbar" style={{ width: `${trust}%` }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <YasBar />
            </div>

        </div>

    )
}
export default Review;