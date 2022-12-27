/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import DefaultProfilePicture from '../../assets/default-profile-picture.jpg';
import BotProfilePicture from '../../assets/bot-image.jpg';
import SendBtn from '../../assets/send-btn.svg';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import ChatBody from '../ChatBody';
import botResponseFunction from '../../utils/botResponseFunction';

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
    };

    try {
      const response = await api.post('/chat', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      messageData.id = response.data[0].id;
      messageData.time_sent = response.data[0].time_sent;

      await socket.emit('send_message', messageData);

      if (messageData.received_by === 'bot@gmail.com') {
        handleChatBot(messageData);
      }

      setAllConversationData([...allConversationData, response.data[0]]);
      setContactMessages([...contactMessages, response.data[0]]);
      setCurrentMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChatBot(data) {
    const botResponse = botResponseFunction(data.message_data);

    const messageData = {
      room: data.room,
      sent_by: 'bot@gmail.com',
      received_by: userData.email,
      message_data: botResponse,
    };

    try {
      const response = await api.post('/chat', messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      messageData.id = response.data[0].id;
      messageData.time_sent = response.data[0].time_sent;

      function handleBotResponse() {
        const sendMessage = setTimeout(() => {
          setAllConversationData((list) => [...list, messageData]);
        }, 2000);

        return () => clearTimeout(sendMessage);
      }

      handleBotResponse();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setAllConversationData((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    function orderMessagesByDate() {
      const getContactChatMessages = allConversationData.filter((message) => {
        return (
          message.sent_by === currentContactSelected.email ||
          message.received_by === currentContactSelected.email
        );
      });
  
      const sortedMessages = getContactChatMessages.sort((a, b) => {
        return new Date(a.time_sent) - new Date(b.time_sent);
      });
  
      setContactMessages(sortedMessages);
    }

    orderMessagesByDate();
  }, [currentContactSelected, allConversationData]);

  return (
    <>
      {Object.keys(currentContactSelected).length === 0 ? (
        <div className='chat-empty'>
          <h2>Inicie uma nova conversa!</h2>
        </div>
      ) : (
        <div className='chat__container'>
          <div className='chat__header'>
            <span className='chat__header__profile-picture'>
              <img
                src={
                  currentContactSelected.email === 'bot@gmail.com'
                    ? BotProfilePicture
                    : DefaultProfilePicture
                }
                alt='perfil'
              />
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
      )}
    </>
  );
}

export default Chat;
