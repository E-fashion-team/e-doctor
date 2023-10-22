"use client"
import { useEffect, useRef } from 'react';
import Peer, { MediaConnection } from 'peerjs';

const ReceiveCall: React.FC = () => {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  let peer: Peer | null = null;

  useEffect(() => {
    // Initialize PeerJS
    peer = new Peer('selim');

    // Get access to the local camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Create a video call answer when an incoming call is received
        peer?.on('call', (call: MediaConnection) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        })
      })
      .catch((error) => {
        console.error('Error accessing user media:', error);
      });

    // Close the PeerJS connection when the component unmounts
    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h1>Receive Video Call</h1>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default ReceiveCall;
