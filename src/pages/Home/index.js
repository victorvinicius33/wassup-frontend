/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/IMG_3084.jpg';
import Button from '../../assets/three-points-btn.svg';
import ContactCard from '../../components/ContactCard';
import ModalOptions from '../../components/ModalOptions';
import ModalAddContact from '../../components/ModalAddContact';
import Chat from '../../components/Chat';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import useGlobal from '../../hooks/useGlobal';
import { useState, useEffect } from 'react';

function Home() {
  const token = getItem('token');
  const { userData, userContacts } = useGlobal();
  const [currentConversation, setCurrentConversation] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    async function joinRoom() {
      try {
        const response = await api.get(
          '/room',
          {
            first_user_email: userData.email,
            second_user_email: currentConversation.email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status > 204) return;

        setRoom(response.data.id);
      } catch (error) {
        console.log(error);
      }
    }

    if (currentConversation.email) {
      joinRoom();
    }

    console.log(currentConversation);
    console.log(userData);
  }, [currentConversation]);

  return (
    <div className='home'>
      <div className='home__left'>
        <div className='side-bar__profile'>
          <span className='side-bar__profile-picture'>
            <img src={ProfilePicture} alt='perfil' />
          </span>

          <span
            className='side-bar__profile-more-btn'
            onClick={() => setShowOptions(!showOptions)}
          >
            <img src={Button} alt='opções do perfil' />

            {showOptions && (
              <ModalOptions setShowAddContact={setShowAddContact} />
            )}
          </span>
        </div>

        <div className='side-bar__contacts'>
          {userContacts.map((contact) => (
            <ContactCard
              contact={contact}
              key={contact.id}
              setCurrentConversation={setCurrentConversation}
            />
          ))}
        </div>
      </div>
      <div className='home__right'>
        <Chat userData={userData} currentConversation={currentConversation} />
      </div>

      {showAddContact && (
        <ModalAddContact setShowAddContact={setShowAddContact} />
      )}
    </div>
  );
}

export default Home;
