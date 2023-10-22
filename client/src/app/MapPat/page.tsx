"use client"
import React, { useEffect, useRef, useState } from 'react';
import L, { Map, TileLayer, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Navbar from '@/components/navbar/Navbar';
import { useSelector } from 'react-redux';
import './style.css'
import Footer from '@/components/footer/Footer';
const MapComponent: React.FC = () => {
  const mapRef = useRef<Map | any>();
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  const [array, setArray] = useState([]);

  const[welc,setWelc]=useState(true)
  const doctor = (state: any) => state.doctor.doctorInfo;
  const docInf = useSelector(doctor);
  const patient = (state: any) => state.patient.patientInfo
const patinf=useSelector(patient)
  const getAllLoc=()=>{
    axios.get('http://localhost:5000/api/docloc/getAll')
    .then((res:any)=>setArray(res.data))
    .catch((err:any)=>console.log(err))
    console.log(array);
    showDocLocation()
}
const checkAllDist = () => {
  const distances: number[] = [];
  const LeastOnes = [];

  array.forEach((e: any) => {
    distances.push(calculDist(lat, lon, e.latitude, e.longitude));
  });

  const minDistance = Math.min(...distances);
  const closestIndex = distances.indexOf(minDistance);
  const closestLocation: React.SetStateAction<never[]>=[]
  closestLocation.push( array[closestIndex]);

  console.log(closestLocation);
setArray(closestLocation);

resetMap ()
if (mapRef.current instanceof L.Map) {
  mapRef.current.setView([lat, lon], 14); // You can adjust the zoom level (e.g., 14) as needed
}
  showDocLocation()
};
const resetMap = () => {
  if (mapRef.current instanceof L.Map) {
    // Remove all layers from the map
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });
    }
  }
};
const calculDist=(lat1: number,lon1: number,lat2: number,lon2: number)=>{
  const R = 6371;
  function toRadians(degrees:number) {
    return degrees * (Math.PI / 180);
}
  const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;

}
  const getLocalisation =()=>{ 
 
    
    if ('geolocation' in navigator) {
    
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude)
            setLon(longitude);
            if (mapRef.current instanceof L.Map) {
              mapRef.current.setView([latitude, longitude], 16); // You can adjust the zoom level (e.g., 14) as needed
            }
            var circle = L.circle([latitude, longitude], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: 100
          })
            if (mapRef.current instanceof L.Map) {
              circle.addTo(mapRef.current);
              circle.bindPopup("you are here").openPopup();
            }
 
          },
          (error) => {
            console.error(`Error getting geolocation: ${error.message}`);
          }
        );  // Geolocation is available
    } else {
      // Geolocation is not available in this browser
      console.log('Geolocation is not available in this browser.');
    }
  }
 
  

  // ...
  
  const showDocLocation = () => {
    if (mapRef.current) {
      array.forEach((e: { latitude: number, longitude: number ,name:string }) => {
        const marker = L.marker([e.latitude, e.longitude]);
  
        if (mapRef.current instanceof L.Map) {
          marker.addTo(mapRef.current);
          marker.bindPopup(`${e.name}'s cabinet`).openPopup();
        }
      });
    }
  };
  
  
  useEffect(() => {

    setInterval(()=>{setWelc(false)},5000)
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([36.854613, 10.170967], 10);

      const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      });
    
      
      baseLayer.addTo(mapRef.current);

     showDocLocation()
    }}
    ,[]);

  return (
  <div>
  <div className='nav-bar'> 
    <Navbar/>
  </div>
  <div className="welcoming">
        {welc?<h2>Welcome  {docInf.name||patinf.name} </h2>:null}
          </div>
          <div className="add-loc">
          <h2>Here you can see your location and doctors locations</h2>
      
      </div>
      <div className="doc-map">

    <div id="map" style={{ height: '500px' ,width:"800px"}} />
   </div>
   <div className="btn-add">

    <button className="button-add" onClick={()=>getAllLoc()}>Get all doctors location </button>
  
  
    <button className="button-add" onClick={()=>getLocalisation()}>get my location</button>
  <button className="button-add" onClick={()=>checkAllDist()}>get the nearest doctor</button>
  </div>
  
  <div className="foot">
     <Footer/>
        </div>
  </div>);
};

export default MapComponent;
