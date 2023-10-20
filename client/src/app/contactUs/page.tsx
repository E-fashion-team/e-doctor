"use client"

import React, { useState, useRef } from "react";
import './style.css'
import img from "../../images/hospital.png"
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify'



const ContactUs = () => {

    const formInfo = useRef<any>(null)
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        topic: '',
        message: ''
    })
    const [notif, setNotif] = useState(false)

    const handleChange = (e: any) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            const res = await emailjs.sendForm("service_22vvajd", "template_jmq6zhg", formInfo.current, "3FXdZ9nJ9CL4YwBW0")
            if (res.status === 200) {
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    topic: '',
                    message: ''
                })
                setNotif(true)
                setTimeout(() => {
                    setNotif(false)
                }, 3000)
                toast.success('Your email Was sent Successfully 📨', {
                    icon: false,
                    style: {
                        position: 'fixed',
                        right: '30px',
                        top: '100px',
                        height: '50px',
                        color: 'white',
                        backgroundColor: '#007e85',
                        borderRadius: '10px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    className: 'custom-toast-container',
                    closeButton: false,
                });
            } else {
                setNotif(true)
                setTimeout(() => {
                    setNotif(false)
                }, 3000)
                toast.error("Something went wrong, your email wasn't sent", {
                    icon: false,
                    style: {
                        position: 'fixed',
                        right: '30px',
                        top: '100px',
                        height: '50px',
                        color: 'white',
                        backgroundColor: '#007e85',
                        borderRadius: '10px',
                        padding: '20px'
                    },
                    className: 'custom-toast-container',
                    closeButton: false,
                });
                
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ background: "#ececec" }} className="contactUsPageContainer">
            <Navbar />
            {notif ? <ToastContainer/> : null}
            <div style={{ width: "100%" }}>
                <Image style={{ width: "100%" }} src={img} alt="hospital" />
            </div>
            <div className="container" >
                <div className="titles">
                    <h5 style={{ fontSize: "21.33px;" }}>Get In Touch</h5>
                    <h1 style={{ fontSize: "64px" }}>Contact Us</h1>
                    <p style={{ fontSize: "24px;" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <form className="contact-us-form-wrapper-all-of-all" ref={formInfo}>
                    <div className="d-flex gap-3">
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputEmail4" className="form-label">First name</label>
                            <input type="text" onChange={handleChange} name="firstName" value={form.firstName} className="form-control border" id="inputEmail4" placeholder="Enter your first name" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputPassword4" className="form-label">Last name</label>
                            <input type="text" onChange={handleChange} name="lastName" value={form.lastName} className="form-control border" id="inputPassword4" placeholder="Enter you last name" />
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" onChange={handleChange} name="email" value={form.email} className="form-control border" id="inputEmail4" placeholder="Enter your email" />
                        </div>
                        <div className="col-md-6 d-flex flex-column align-items-start">
                            <label htmlFor="inputPassword4" className="form-label">Phone number</label>
                            <input type="text" onChange={handleChange} name="phone" value={form.phone} className="form-control border" id="inputPassword4" placeholder="Enter your phone number" />
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label-wahadha">Choose a topic</label>
                        <select name="topic" onChange={handleChange} value={form.topic} className="form-select border" id="validationCustom04" required>
                            <option selected disabled value="">Select one...</option>
                            <option value="Technical Issues">Technical Issues</option>
                            <option value="Account Assistance">Account Assistance</option>
                            <option value="Order Status and Tracking">Order Status and Tracking</option>
                            <option value="Product Issues">Product Issues</option>
                            <option value="Returns and Refunds">Returns and Refunds</option>
                            <option value="Shipping and Delivery">Shipping and Delivery</option>
                            <option value="Billing and Payment">Billing and Payment</option>
                            <option value="Product Recommendations">Product Recommendations</option>
                            <option value="General Inquiries">General Inquiries</option>
                            <option value="Feedback and Suggestions">Feedback and Suggestions</option>
                            <option value="Partnership Inquiries">Partnership Inquiries</option>
                            <option value="Press and Media Inquiries">Press and Media Inquiries</option>
                            <option value="Employment and Careers">Employment and Careers</option>
                            <option value="Privacy and Data Concerns">Privacy and Data Concerns</option>
                            <option value="Marketing and Promotions">Marketing and Promotions</option>
                            <option value="Warranty Claims">Warranty Claims</option>
                            <option value="Accessibility and Accommodations">Accessibility and Accommodations</option>
                            <option value="Legal Issues">Legal Issues</option>
                            <option value="Customer Support Feedback">Customer Support Feedback</option>
                            <option value="Other Issues">Other Issues</option>
                        </select>
                    </div>
                    <div className="form-floating">
                    </div>
                    <label htmlFor="floatingTextarea2" className="messageLabel" >Message</label>
                    <textarea name="message" onChange={handleChange} value={form.message} className="form-control border" placeholder="Type Your message" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <div className="form-check d-flex gap-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">I accept the terms</label>
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            style={{
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
                                name="email"
                                onChange={handleChange}
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
                </form>
            </div>
            <Footer />
        </div >
    )
}

export default ContactUs;