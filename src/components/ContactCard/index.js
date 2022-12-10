import './style.css';
import DefaultProfilePicture from '../../assets/IMG_3084.jpg';

function ContactCard({ contact, setcurrentContactSelected, currentContactSelected }) {
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
        <span className='contact__info-name'>{contact.name}</span>
        <span className='contact__last-message-time'>
          {contact.lastMessageTime}
        </span>
      </div>
    </div>
  );
}

export default ContactCard;
