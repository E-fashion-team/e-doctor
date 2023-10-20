
// export default DoctorChat
"use client"
import React, { useState } from 'react';
import SideBar from '../SideBar'
import "./style.css"
import ChatList from './ChatRooms';
import ChatRoom from './Conversation';

const DoctorChat = () => {
  const [udpate, setUpdate] = useState<boolean>(true);
  return (
    <div>
      {/* <section style={{ backgroundColor: '#CDC4F9' }}>
        <div className="container py-5">
          <div className="row">
            <ChatList udpate={udpate}  setUpdate={setUpdate}/>
            <ChatRoom udpate={udpate}  />
          </div>
        </div>
      </section> */}
      chat
    </div>
  );
};

export default DoctorChat;
