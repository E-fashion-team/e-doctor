
import React, { useEffect, useState } from 'react';
import "./style.css"
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';

const socket = io("http://localhost:5000")
const Conversation = ({ udpate }: any) => {
  const type = localStorage.getItem('type')
  const roomId: any = localStorage.getItem('roomId')
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo);
  const [reciver, setReciver] = useState<any>({})
  const [sender, setSender] = useState<any>({})




  // const left = doctor.phone == 



  const [msg, setMsg] = useState<any[]>([]);

  const [message, setMessage] = useState("");
  const handleGetMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/room/OneRoom/${roomId}`)
      setMsg(response.data.Messages);
      // if (type === "doctor") {
      //   setReciver(response.data.Patient)
      //   setSender(response.data.Doctor)
      // } else {
      //   setReciver(response.data.Doctor)
      //   setSender(response.data.Patient)
      // }
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   handleGetMessages()
  // }
  //   , [])



  const handleSendMessage = async () => {
    if (message.trim()) {
      let DoctorId = ""
      let PatientId = ""
      if (sender.papers) {
        DoctorId = sender.id
        PatientId = reciver.id
      } else {
        DoctorId = reciver.id
        PatientId = sender.id
      }

      socket.emit('message', {
        content: message, senderPhone: sender.phone, DoctorId, PatientId, RoomId: roomId * 1
      })

      setMessage("")
      try {

        const res = await axios.post("http://localhost:5000/api/message/add/", { content: message, senderPhone: sender.phone, DoctorId, PatientId, RoomId: roomId * 1 })

      } catch (error) {
        console.log(error);

      }

    }
  }

  useEffect(() => {
    socket.on('messageResponse', (data: any) => {
      setMsg([...msg, data])

    })
  }, [])







  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
        {/* Conversation messages from User 1 */}
        {msg.map((message: any, i: number) => {
          // const left = message.senderPhone == reciver.phone

          // const sender = message.senderPhone == doctor.phone ? doctor : patient
          // const reciver = message.senderPhone != doctor.phone ? doctor : patient
          setSender(message.senderPhone == doctor.phone ? doctor : patient)
          setReciver(message.senderPhone != doctor.phone ? doctor : patient)
          const left = message.sendPhone == reciver.phone
          return (
            <div className={left ? "d-flex flex-row justify-content-start" : "d-flex flex-row justify-content-end"} key={i}>
              <img
                src={left ? reciver.avatarUrl : sender.avatarUrl}
                alt="User 1"
                style={{ width: '45px', height: '100%', borderRadius: "50%" }}
              />
              <div >
                <p
                  className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: left ? '#f5f6f7' : "blue" }}>
                  {message.content}
                </p>
                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{message.createdAt?.slice(0, 10)}</p>
              </div>
            </div>)
        })}
      </div>
      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img
          src={type === "doctor" ? doctor.avatarUrl : patient.avatarUrl}
          alt="User 1"
          style={{ width: '50px', height: '100%', borderRadius: "50%", objectFit: 'cover' }}
        />
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
        <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
      </div>
    </div>
  );
};

export default Conversation;