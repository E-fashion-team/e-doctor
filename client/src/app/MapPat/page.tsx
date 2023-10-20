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
const checkAllDist=()=>{
var distances: number[]=[]
var LeastOnes=[]
  array.forEach((e:any)=>{
distances.push(calculDist(lat,lon,e.latitude,e.longitude))
  })
let i=Math.min(...distances)
var j=distances.indexOf(i)
LeastOnes.push(array[j])
}
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
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            const marker = L.marker([latitude, longitude]);
  
            if (mapRef.current instanceof L.Map) {
              marker.addTo(mapRef.current);
              marker.bindPopup("you are here").openPopup();
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
  
  
    <button onClick={()=>getLocalisation()}>get my location</button>
  <button onClick={()=>checkAllDist()}></button>
  </div>);
};

export default MapComponent;
