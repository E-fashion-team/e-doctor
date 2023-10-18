"use client"

import React, { useState } from "react";
import './style.css'
import img from "../../images/hospital.png"
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";


const ContactUs = () => {

    const [email, setEmail] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(email)
    }

    return (
        <div style={{ background: "#ececec" }} className="contactUsPageContainer">
            <Navbar/>
            <div style={{ width: "100%" }}>
                <Image style={{ width: "100%" }} src={img} alt="hospital" />
            </div>
            <div className="container" >
                <div className="titles">
                    <h5 style={{ fontSize: "21.33px;" }}>Get In Touch</h5>
                    <h1 style={{ fontSize: "64px" }}>Contact Us</h1>
                    <p style={{ fontSize: "24px;" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="contact-us-form-wrapper-all-of-all" >
                    <div className="d-flex gap-3">
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputEmail4" className="form-label">First name</label>
                            <input type="text" className="form-control border" id="inputEmail4" placeholder="Enter your first name" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputPassword4" className="form-label">Last name</label>
                            <input type="password" className="form-control border" id="inputPassword4" placeholder="Enter you last name" />
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control border" id="inputEmail4" placeholder="Enter your email" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputPassword4" className="form-label">Phone number</label>
                            <input type="password" className="form-control border" id="inputPassword4" placeholder="Enter your phone number" />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label-wahadha">Choose a topic</label>
                        <select className="form-select border" id="validationCustom04" required>
                            <option selected disabled value="">Select one...</option>
                            <option>Select one...</option>
                        </select>
                    </div>
                    <div className="form-floating">
                    </div>
                    <label htmlFor="floatingTextarea2" className="messageLabel" >Message</label>
                    <textarea className="form-control border" placeholder="Type Your message" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <div className="form-check d-flex gap-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">I accept the terms</label>
                    </div>
                    <div className="col-12">
                        <button type="submit" style={{
                            height: "3.5rem",
                            width: "25rem",
                            color: "#fff",
                            transform: "capitalize",
                            padding: "1rem 0rem",
                            borderRadius: "0.5rem",
                            background: "#007E85"
                        }} className="btn btn-primary_y btn-removeHover">Submit</button>
                    </div>
                    <div>
                        <h2 className="subHeader">Subscribe to our newsletter</h2>
                        <div className="search-bottom-container d-flex gap-4 justify-content-center">
                            <input
                                className="subEmailInput"
                                onChange={e => setEmail(e.target.value)}
                                style={{
                                width: "26rem",
                                height: "3rem",
                                borderRadius: "3.25rem",
                                background: "#fff",
                                paddingLeft: "1rem",
                                border: "none"
                            }} type="text" placeholder="Enter you email here" />
                            <button className="last-button d-flex align-items-center justify-content-center"
                                style={{
                                    border: "none",
                                    height: "3rem",
                                    width: "9rem",
                                    color: "#fff",
                                    transform: "capitalize",
                                    padding: "1rem 0rem",
                                    borderRadius: "2rem",
                                    background: "#007E85"
                                }}
                            >Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div >
    )
}

export default ContactUs;