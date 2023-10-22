"use client"
import { useEffect, useRef } from 'react';
import Peer, { MediaConnection } from 'peerjs';

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  let peer: Peer | null = null;

  useEffect(() => {
    // Initialize PeerJS
    peer = new Peer();

    // Get access to the local camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;

          // Handle incoming call
          peer?.on('call', (call: MediaConnection) => {
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            });
          });
        }
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

  // Function to make an outgoing call
  const makeCall = () => {
    if (localVideoRef.current) {
      // Replace 'remote_peer_id' with the actual ID of the remote user
      const call = peer?.call('selim', localVideoRef.current.srcObject as MediaStream);
      call?.on('stream', (remoteStream) => {
        console.log('here')
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
    }
  };

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline />
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <button onClick={makeCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
