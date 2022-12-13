import './style.css';
import DefaultProfilePicture from '../../assets/default-profile-picture.jpg';
import { useEffect, useState } from 'react';

function ContactCard({
  contact,
  setcurrentContactSelected,
  currentContactSelected,
  allConversationData,
}) {
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    const getContactChatMessages = allConversationData.filter((message) => {
      return (
        message.sent_by === contact.email ||
        message.received_by === contact.email
      );
    });
    
    if (getContactChatMessages.length === 0) return;

    const sortedMessages = getContactChatMessages.sort((a, b) => {
      return new Date(a.time_sent) - new Date(b.time_sent);
    });

    const lastMessageInfo = {
      sent_by: sortedMessages[sortedMessages.length - 1].sent_by,
      data: sortedMessages[sortedMessages.length - 1].message_data,
      time_sent: sortedMessages[sortedMessages.length - 1].time_sent,
    };

    setLastMessage(lastMessageInfo);
  }, [allConversationData, contact]);

  return (
    <div
      className={`contact contact${
        currentContactSelected.email === contact.email ? '--selected' : ''
      }`}
      onClick={() => setcurrentContactSelected(contact)}
    >
      <span className='contact__img-container'>
        <img src={DefaultProfilePicture} alt='usuário' />
      </span>

      <div className='contact__info'>
        <div className='contact__info-left'>
          <span className='info-left__name'>{contact.name}</span>
          <span className='info-left__last-message'>
            {Object.keys(lastMessage).length === 0
              ? ''
              : lastMessage.sent_by === contact.email
              ? lastMessage.data
              : `Você: ${lastMessage.data}`}
          </span>
        </div>
        <div className='contact__info-right'>
          <span className='info-right__last-message-time'>
            {Object.keys(lastMessage).length === 0
              ? ''
              : new Date(lastMessage.time_sent)
                  .getHours()
                  .toString()
                  .padStart(2, '0') +
                ':' +
                new Date(lastMessage.time_sent)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}
          </span>
          <span className='info-right__unread-messages'>0</span>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
