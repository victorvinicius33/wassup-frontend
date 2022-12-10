/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/default-profile-picture.jpg';
import SendBtn from '../../assets/send-btn.svg';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import ChatBody from '../ChatBody';

function Chat({ userData, currentContactSelected, socket, room }) {
  const token = getItem('token');
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationData, setConversationData] = useState([]);

  async function sendMessage() {
    if (currentMessage === '') return;

    const messageData = {
      room: room.id,
      sent_by: userData.email,
      received_by: currentContactSelected.email,
      message_data: currentMessage,
      time_sent: new Date(Date.now()).toLocaleString('pt-BR'),
    };

    await socket.emit('send_message', messageData);

    try {
      const response = await api.post('/chat', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConversationData((list) => [...list, response.data[0]]);
      setCurrentMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      if (
        data.sent_by === room.first_user_email ||
        data.sent_by === room.second_user_email
      ) {
        setConversationData((list) => [...list, data]);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (Object.keys(currentContactSelected).length === 0) return;

    async function getMessages() {
      try {
        const response = await api.get('/chat', {
          params: {
            first_user_email: userData.email,
            second_user_email: currentContactSelected.email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status > 204) return;

        const sortedArray = response.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        setConversationData(sortedArray);
      } catch (error) {
        console.log(error);
      }
    }

    getMessages();
  }, [currentContactSelected]);

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <span className='chat__header__profile-picture'>
          <img src={ProfilePicture} alt='perfil' />
        </span>

        <h2>{currentContactSelected.name}</h2>
      </div>

      <ChatBody
        conversationData={conversationData}
        currentContactSelected={currentContactSelected}
      />

      <div className='chat__footer'>
        <input
          placeholder='Mensagem'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>
          <img src={SendBtn} alt='enviar' />
        </button>
      </div>
    </div>
  );
}

export default Chat;
