"use client";
import React, { useEffect, useState } from "react";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import axios from "axios";
import { toast } from "react-toastify";

type Appprops = {
  appo: any;
};

const OneAppointment = ({ appo }: Appprops) => {
  const dispatch: AppDispatch = useDispatch();

  const [star, setStar] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const decline = faRectangleXmark as IconProp;
  const accept = faSquareCheck as IconProp;
  const doctor: any = useSelector((state: RootState) => state.doctor);
  const type = localStorage.getItem("type");

  const handleAddReview = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/review/addReview",
        {
          rate: star,
          content: review,
          PatientId: appo.PatientId,
          DoctorId: appo.Doctor.id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpdateAppointment = async (appoId: string, obj: object) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointment/${appoId}`,
        obj
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="appointment-requests-list-container-request">
      <div className="d-flex align-items-center gap-4">
        <div className="image-frame2">
          <img
            src={
              type === "patient"
                ? appo.Doctor.avatarUrl
                : type === "doctor"
                ? appo.Patient.avatarUrl
                : ""
            }
            alt=""
          />
        </div>

        <div>
          {type === "patient" && (
            <i
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${appo.id}`}
              className="fa-solid fa-circle-info fa-xl"
              style={{ color: "#007e85" }}
            ></i>
          )}
        </div>
        {/* //modal */}
        <div
          className="modal fade"
          id={`staticBackdrop${appo.id}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column gap-4">
                <div className="d-flex gap-2 justify-content-center">
                  <i
                    onClick={() => setStar(1)}
                    className={star >= 1 ? "fas fa-star" : "farfa-star"}
                    style={{ color: "#fda900" }}
                  ></i>
                  <i
                    onClick={() => setStar(2)}
                    className={star >= 2 ? "fas fa-star" : "far fa-star"}
                    style={{ color: "#fda900" }}
                  ></i>
                  <i
                    onClick={() => setStar(3)}
                    className={star >= 3 ? "fas fa-star" : "far fa-star"}
                    style={{ color: "#fda900" }}
                  ></i>
                  <i
                    onClick={() => setStar(4)}
                    className={star >= 4 ? "fas fa-star" : "far fa-star"}
                    style={{ color: "#fda900" }}
                  ></i>
                  <i
                    onClick={() => setStar(5)}
                    className={star >= 5 ? "fas fa-star" : "far fa-star"}
                    style={{ color: "#fda900" }}
                  ></i>
                </div>
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  className="w-100"
                  style={{
                    paddingLeft: "1rem",
                    outline: "none",
                    border: "none",
                    borderBottom: "1px solid blue",
                  }}
                  placeholder="Write Your Review "
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    color: "#007e85",
                  }}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={() => handleAddReview()}
                  type="button"
                  style={{ backgroundColor: "#007e85", border: "none" }}
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="appointment-requests-list-container-request-details">
        <span className="appointment-requests-list-container-request-details-name">
          {type === "patient"
            ? appo.Doctor.name
            : type === "doctor"
            ? appo.Patient.name
            : ""}
        </span>
        <span className="appointment-requests-list-container-request-details-data">
          {type === "patient"
            ? appo.date
            : type === "doctor"
            ? appo.Patient.gender.toUpperCase() + " , " + appo.date
            : ""}
        </span>
      </div>
      {appo.status !== "pending" ? (
        <div className={appo.status === "accepted" ? "confirmed" : "declined"}>
          <div className="d-flex gap-4 align-items-center">
            <span
              className={
                appo.status === "accepted"
                  ? "confirmed-content"
                  : "declined-content"
              }
            >
              {appo.status === "accepted" ? "Confirmed" : "Declined"}
            </span>
            {!appo.isFinished && (
              <i
                onClick={() => {
                  handelUpdateAppointment(appo.id, { isFinished: true });
                  toast.success("Thank You For Payment", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }}
                className="fa-brands fa-amazon-pay"
              ></i>
            )}
          </div>
        </div>
      ) : (
        <div className="pending">
          {doctor.isAuthenticated ? (
            <>
              <FontAwesomeIcon
                onClick={() =>
                  handelUpdateAppointment(appo.id, { status: "rejected" })
                }
                className="pending-buttons"
                icon={decline}
                style={{ color: "rgb(242, 0, 255)" }}
              />
              <FontAwesomeIcon
                onClick={() =>
                  handelUpdateAppointment(appo.id, { status: "accepted" })
                }
                className="pending-buttons"
                icon={accept}
                style={{ color: "rgb(26, 88, 244)" }}
              />
            </>
          ) : (
            <div className="pending-patient">
              <span className="pending-patient-content">Pending</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneAppointment;
