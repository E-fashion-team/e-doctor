"use client"
import Peer from 'peerjs';
import React, { useEffect, useRef } from 'react';

function callPatiet() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoRec = useRef<HTMLVideoElement | null>(null);

  const peer = new Peer();
  
  
    useEffect(() => {
      
      
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          
          }

         peer.call('signal', stream);
            console.log('video');
         
  
     
        })
        .catch((error) => {
          console.error('Error accessing media devices: ', error);
        });
    }, []);
  
    return (
      <div>
        <h2>Streaming</h2>
       
        <video ref={videoRef} autoPlay muted playsInline ></video>
      <video></video>
      </div>
    );
  }
  
  export default callPatiet;