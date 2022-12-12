import './style.css';
import { useEffect } from 'react';

function ChatBody({ contactMessages, currentContactSelected }) {
  useEffect(() => {
    const chatContainer = document.querySelector('.chat__body');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [contactMessages, currentContactSelected]);

  return (
    <div className='chat__body'>
      {contactMessages.map((message) => {
        return (
          <div
            key={message.id}
            className='message'
            id={
              currentContactSelected.email === message.received_by
                ? 'you'
                : 'other'
            }
          >
            <div className='message__container'>
              <div className='message__content'>
                <p>{message.message_data}</p>
              </div>
              
              <div className='message__timestamp'>
                <p>
                  {new Date(message.time_sent)
                    .getHours()
                    .toString()
                    .padStart(2, '0') +
                    ':' +
                    new Date(message.time_sent)
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBody;
