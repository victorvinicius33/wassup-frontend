/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/IMG_3084.jpg';
import SendBtn from '../../assets/send-btn.svg';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:8000');

function Chat({ userData, currentConversation }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationData, setConversationData] = useState('');

  async function sendMessage() {
    if(currentMessage === '') return;

    const messageData = { 
      sent_by: userData.email, 
      received_by: currentConversation.email, 
      message_data: currentMessage, 
      time_sent: new Date(Date.now()) 
    }

    socket.emit('send_message', messageData);
    setCurrentMessage('');
  }


  useEffect(() => {
    socket.on('receive_message', (data) => {
      setConversationData((currentMessages) => [...currentMessages, data]);
    });
  }, [socket]);

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <span className='chat__header__profile-picture'>
          <img src={ProfilePicture} alt='perfil' />
        </span>

        <h2>{currentConversation.name}</h2>
      </div>
      <div className='chat__body'>
        <ul>
          {conversationData && conversationData.map((messageContent) => {
            return <li>{messageContent.message}</li>;
          })}
        </ul>
      </div>
      <div className='chat__footer'>
        <input
          placeholder='Mensagem'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <img src={SendBtn} alt='enviar' />
        </button>
      </div>
    </div>
  );
}

export default Chat;
