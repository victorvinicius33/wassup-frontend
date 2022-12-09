/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/IMG_3084.jpg';
import SendBtn from '../../assets/send-btn.svg';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import ChatBody from '../ChatBody';

function Chat({
  userData,
  currentConversation,
  socket,
  allRooms,
  conversationData,
  setConversationData,
}) {
  const token = getItem('token');
  const [currentMessage, setCurrentMessage] = useState('');

  async function sendMessage() {
    if (currentMessage === '') return;

    const room = allRooms.find((room) => {
      return (
        (room.first_user_email === currentConversation.email &&
          room.second_user_email === userData.email) ||
        (room.second_user_email === currentConversation.email &&
          room.first_user_email === userData.email)
      );
    });

    const messageData = {
      room: room.id,
      sent_by: userData.email,
      received_by: currentConversation.email,
      message_data: currentMessage,
      time_sent: new Date(Date.now()).toLocaleString('pt-BR'),
    };

    await socket.emit('send_message', messageData);

    try {
      await api.post(
        '/chat',
        {
          room: room.id,
          sent_by: userData.email,
          received_by: currentConversation.email,
          message_data: currentMessage,
          time_sent: new Date(Date.now()).toLocaleString('pt-BR'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setConversationData((list) => [...list, messageData]);
    setCurrentMessage('');
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setConversationData((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (
      conversationData.length === 0 &&
      Object.keys(currentConversation).length === 0
    )
      return;

    const chatContainer = document.querySelector('.chat__body');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [conversationData]);

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <span className='chat__header__profile-picture'>
          <img src={ProfilePicture} alt='perfil' />
        </span>

        <h2>{currentConversation.name}</h2>
      </div>

      <ChatBody
        conversationData={conversationData}
        currentConversation={currentConversation}
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
