import './style.css';

function ChatBody({ conversationData, currentConversation }) {
  return (
    <div className='chat__body'>
      {conversationData.map((message) => {
        return (
          <div
            className='message'
            id={
              currentConversation.email === message.received_by
                ? 'you'
                : 'other'
            }
          >
            <div className='message__container'>
              <div className='message__content'>
                <p>{message.message_data}</p>
              </div>
              <div className='message__timestamp'>
                <p id='time'>
                  {new Date(message.time_sent).getHours() +
                    ':' +
                    new Date(message.time_sent).getMinutes()}
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
