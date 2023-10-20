"use client";
import React, { useEffect, useRef, useState } from "react";
import L, { Map, TileLayer, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { getOneDoctor } from "@/store/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import Navbar from "@/components/navbar/Navbar";
import "./style.css";
const MapDoc: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const[welc,setWelc]=useState(true)
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [array, setArray] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const doctor = (state: any) => state.doctor.doctorInfo;
  const docInf = useSelector(doctor);
  console.log(docInf, "here the doctor ");

  const DoctorId = 1;
  // const getAllLoc=()=>{
  //     axios.get('http://localhost:5000/api/docloc/getAll')
  //     .then((res:any)=>setArray(res.data))
  //     .catch((err:any)=>console.log(err))
  //     console.log(array);
  //     showDocLocation()
  // }
  const getLocalisation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLon(longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          axios
            .post("http://localhost:5000/api/docloc/addlocdoc", {
              latitude,
              longitude,
              DoctorId,
            })
            .then((res: any) => console.log(res.data))
            .catch((err: any) => console.log(err));
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
        }
      ); // Geolocation is available
    } else {
      // Geolocation is not available in this browser
      console.log("Geolocation is not available in this browser.");
    }
  };
  // const showDocLocation = () => {
  //   if (mapRef.current) {
  //     array.forEach((e:any) => {

  //       const marker = L.marker([e.latitude, e.longitude]);

  //       if (mapRef.current instanceof L.Map) {
  //         marker.addTo(mapRef.current);
  //         marker.bindPopup(e.DoctoId).openPopup();
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type === "doctor") {
      dispatch(getOneDoctor());
      setInterval(()=>{setWelc(false)},5000)
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([36.854613, 10.170967], 14);

        const baseLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
          }
        );

        baseLayer.addTo(mapRef.current);

        //  showDocLocation()
      }
    } else {
      alert(
        "Please you are not allowed to access this page from patient account"
      );
    }
  }, []);

  return (
    <div className="doctor-map">
      <div className="nav-bar">
        <Navbar />
      </div>

      <div className="welcoming">
        {welc?<h2>Welcome doctor selim </h2>:null}
          </div>
          <div className="add-loc">
          <h2>Here you can add your location :</h2>
      
      </div>
      <div className="doc-map">
         <div id="map" style={{ height: "500px", width: "800px" }} />
        </div>
        <div className="btn-add">
        <button className="button-add" onClick={() => getLocalisation()}>add my location</button>
        </div>
    </div>
  );
};

export default MapDoc;
