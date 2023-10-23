"use client"
import { useState, FormEvent } from "react";
//import { useRouter } from 'next/router';
import ChatRoom from "../../components/chatroom/chatroom";
import Layout from "../../components/layout/layout";
import styles from '../../styles/home.module.css';

export default function Home() {
   const [roomName, setRoomName] = useState("");
   const [roomid, setRoomId] = useState('');
   //const router = useRouter();

   const handleRoomNameChange = (event: FormEvent<HTMLInputElement>) => {
      setRoomName(event.currentTarget.value.replace(/<\/?[^>]*>/g, ""));
   };
  
   return (
      <Layout>
         <>
         {roomid &&
         <ChatRoom
            roomid={roomid}
         /> 
         }
         {!roomid &&
         <div className={styles.homeContainer}>
            <h1 style={{textAlign: 'center'}}>Chat With Your doctor</h1>
            <input
               type="text"
               placeholder="Room"
               value={roomName}
               onChange={handleRoomNameChange}
               className={styles.textInputField}
               />
            <div className={styles.enterRoomButton} onClick={() => setRoomId(roomName)}>
                Join room
            </div>   
            <div className={styles.remarkContainer}>

            </div>
         </div>
         }
         </>
      </Layout>
   );
}    