/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/default-profile-picture.jpg';
import SendBtn from '../../assets/send-btn.svg';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import ChatBody from '../ChatBody';

function Chat({
  userData,
  currentContactSelected,
  socket,
  allConversationData,
  setAllConversationData,
  allRooms,
}) {
  const token = getItem('token');
  const [currentMessage, setCurrentMessage] = useState('');
  const [contactMessages, setContactMessages] = useState([]);

  async function sendMessage() {
    if (currentMessage === '') return;

    const room = allRooms.find((room) => {
      return (
        room.first_user_email === currentContactSelected.email ||
        room.second_user_email === currentContactSelected.email
      );
    });

    const messageData = {
      room: room.id,
      sent_by: userData.email,
      received_by: currentContactSelected.email,
      message_data: currentMessage,
      time_sent: new Date(Date.now()).toLocaleString('pt-BR'),
    };

    try {
      const response = await api.post('/chat', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      messageData.id = response.data[0].id;

      await socket.emit('send_message', messageData);

      setAllConversationData([...allConversationData, response.data[0]]);
      setContactMessages([...contactMessages, response.data[0]]);
      setCurrentMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setAllConversationData((list) => [...list, data])
    });
  }, [socket]);

  useEffect(() => {
    const getContactChatMessages = allConversationData.filter((message) => {
      return (
        message.sent_by === currentContactSelected.email ||
        message.received_by === currentContactSelected.email
      );
    });

    const sortedMessages = getContactChatMessages.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    setContactMessages(sortedMessages);
  }, [currentContactSelected, allConversationData]);

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <span className='chat__header__profile-picture'>
          <img src={ProfilePicture} alt='perfil' />
        </span>

        <h2>{currentContactSelected.name}</h2>
      </div>

      <ChatBody
        contactMessages={contactMessages}
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
