'use client'
import { useState, useEffect, use } from 'react';
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import './style.css';
import { RootState } from '@/store/store';

const socket = io("http://localhost:3000");

const Chat = () => {
const [mes, setMes] = useState("");
const [doctorMessages, setDoctorMessages] = useState<{ message: string, class: string, time: string }[]>([]);
const [patientMessages, setPatientMessages] = useState<{ message: string, class: string, time: string }[]>([]);
const userName = useSelector((state: RootState) => state.doctor.doctorInfo.name);
const patientName = useSelector((state: RootState) => state.patient.name);
console.log(userName,"userName");

  const sendMessage = async () => {
    if (mes.trim() !== "") {
      const userType = localStorage.getItem("type");
const senderName = userType === "doctor" ? "Doctor" : "Patient";
const messageData: { message: string, class: string, time: string, sender: string } = {
  message: mes,
  class: userType === "doctor" ? "doctor" : "patient",
  time: new Date().toLocaleTimeString(),
  sender: senderName
};

      await socket.emit("send-message", messageData);
      
      if (userType === "doctor") {
        setDoctorMessages([...doctorMessages, messageData]);
      } else {
        setPatientMessages([...patientMessages, messageData]);
      }

      setMes("");
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.class === "doctor") {
        setDoctorMessages([...doctorMessages, data]);
      } else {
        setPatientMessages([...patientMessages, data]);
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [doctorMessages, patientMessages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
      {doctorMessages.map((message, index) => (
  <div key={index} className={message.class}>
    <p>{message.sender}: {message.message}</p>
    <span>{message.time}</span>
  </div>
))}
{patientMessages.map((message, index) => (
  <div key={index} className={message.class}>
    <p>{message.sender}: {message.message}</p>
    <span>{message.time}</span>
  </div>
))}
      </div>
      <div className="chat-input">
        <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
