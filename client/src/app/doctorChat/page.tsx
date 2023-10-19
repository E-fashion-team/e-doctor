"use client"
import "./style.css"
import ChatList from '../../components/conversation/Conversation';
import ChatRooms from '../../components/chatRooms/ChatRooms';
import { useState } from 'react';

const DoctorChat = () => {
  const [update, setUpdate] = useState<boolean>(true);
  return (
    <div>
      <section style={{ backgroundColor: '#CDC4F9' }}>
        <div className="container py-5">
          <div className="row">
            <ChatList update={update} setUpdate={setUpdate} />
            <ChatRooms update={update} setUpdate={setUpdate} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorChat;