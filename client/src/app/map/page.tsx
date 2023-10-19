"use client"
import React, { useEffect, useRef, useState } from 'react';
import L, { Map, TileLayer, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  const[array,setArray]=useState([])
const arr =[ [35.8508928, 10.15808,"zeineb cabinet"],[35.44552,9.5452235,"yassin cabinet"],[37.6842655,11.15808,"balkis cabinet"]]
const DoctorId=1
const getAllLoc=()=>{
    axios.get('http://localhost:5000/api/docloc/getAll')
    .then((res:any)=>setArray(res.data))
    .catch((err:any)=>console.log(err))
    console.log(array);
    showDocLocation()
}
  const getLocalisation =()=>{ 
 
    
    if ('geolocation' in navigator) {
    
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude)
            setLon(longitude);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
         axios.post('http://localhost:5000/api/docloc/addlocdoc',{latitude,longitude,DoctorId})
         .then((res:any)=>console.log(res.data))
    .catch((err:any)=>console.log(err))
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
  const showDocLocation = () => {
    if (mapRef.current) {
      array.forEach((e:any) => {

        
        const marker = L.marker([e.latitude, e.longitude]);
  
        if (mapRef.current instanceof L.Map) {
          marker.addTo(mapRef.current);
          marker.bindPopup(e.DoctoId).openPopup();
        }
      });
    }
  };
  

  
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([36.854613, 10.170967], 11);

      const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      });
    
      
      baseLayer.addTo(mapRef.current);

     showDocLocation()
    }
  }, []);

  return (
  <div>
  
    <div id="map" style={{ height: '500px' }} />
    <button onClick={()=>getAllLoc()}>Get all doctors location </button>
  
    <button onClick={()=>getLocalisation()}>add my location</button>
  </div>);
};

export default MapComponent;
