
import React, { useEffect, useState } from 'react';
import "./style.css"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/redux/store';
interface props {
  setUpdate: any;
  udpate: boolean;
}
const ChatRooms = ({ setUpdate, udpate }: props) => {
  const [chatRooms, setChatRooms] = useState<any[]>([])
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo);
  const type = localStorage.getItem('type')


  const getAllchatRooms = async () => {
    try {
      const type = localStorage.getItem('type')
      if (type === 'doctor') {
        const res = await axios.get(`http://localhost:5000/api/room/getAllDoc/${doctor.id}`)
        setChatRooms(res.data)
      } else if (type === "patient") {
        const res = await axios.get(`http://localhost:5000/api/room/getAllPat/${patient.id}`)
        setChatRooms(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllchatRooms()
  }, [])

  return (
    <div className="hre col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 bordered">
      <div className="p-3">
        <div className="input-group rounded mb-3">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <div data-mdb-perfect-scrollbar="true" className='container_rooms' style={{ position: 'relative', height: '400px' }}>
          <ul className="list-unstyled mb-0">

            {
              chatRooms?.map((room) =>
                <li
                  onClick={() => { localStorage.setItem('roomId', room.id); setUpdate(!udpate) }}
                  key={room.id}
                  className="p-2 border-bottom">
                  <a className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <div>
                        <img
                          src={type === "doctor" ? room.Patient.avatarUrl : room.Doctor.avatarUrl}
                          alt="avatar"
                          className="d-flex align-self-center me-3"
                          width="60"
                        />
                        <span className="badge bg-success badge-dot"></span>
                      </div>
                      <div className="pt-1">
                        <p className="fw-bold mb-0">{type === "doctor" ? room.Patient.name : room.Doctor.name}</p>
                        <p className="small text-muted">{room.Messages[room.Messages.length - 1]?.content}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                    </div>
                  </a>
                </li>)
            }


          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
