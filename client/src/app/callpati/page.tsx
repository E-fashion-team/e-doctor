"use client"
import React, { useRef,useEffect } from "react";
import { Peer } from "peerjs";
function callDoct() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const responseRef = useRef<HTMLVideoElement | null>(null);
  
    useEffect(() => {
     const peer = new Peer('signal');
       
      peer.on('call', (call:any) => {
        console.log('Call')
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  
        .then((stream) => {
            console.log('stream', stream);
            
            call.answer(stream);
            call.on('stream', (remoteStream:any) => {
            
              if (videoRef.current) {
                videoRef.current.srcObject = remoteStream;
              }
            });
          })
          .catch((error) => {
            console.error('Error accessing media devices: ', error);
          });
      });
    }, []);
  
    
  return (
    
    <div>
    
  
                          <div>
                          <video ref={videoRef} autoPlay  playsInline></video>
                          <video ref={responseRef} autoPlay playsInline></video>
    </div>
        </div>                  
  );
  }
  
  export default callDoct;