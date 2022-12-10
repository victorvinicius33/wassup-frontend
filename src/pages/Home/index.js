/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import ProfilePicture from '../../assets/default-profile-picture.jpg';
import Button from '../../assets/three-points-btn.svg';
import ContactCard from '../../components/ContactCard';
import ModalOptions from '../../components/ModalOptions';
import ModalAddContact from '../../components/ModalAddContact';
import Chat from '../../components/Chat';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

function Home() {
  const token = getItem('token');
  const [userData, setUserData] = useState({});
  const [userContacts, setUserContacts] = useState([]);
  const [currentContactSelected, setcurrentContactSelected] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await api.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) return;

        const { contacts, ...userInfo } = response.data;

        setUserData(userInfo);
        setUserContacts(contacts);
      } catch (error) {
        console.log(error);
      }
    }

    async function getAllChatRooms() {
      try {
        const response = await api.get('/room', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) return;

        const rooms = response.data;
        rooms.forEach((room) => {
          socket.emit('join_room', room.id);
        });

        setAllRooms([...rooms]);
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
    getAllChatRooms();
  }, []);

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
              key={contact.id}
              contact={contact}
              setcurrentContactSelected={setcurrentContactSelected}
              currentContactSelected={currentContactSelected}
            />
          ))}
        </div>
      </div>
      <div className='home__right'>
        {Object.keys(currentContactSelected).length === 0 ? (
          <div className='chat-empty'>
            <h2>Inicie uma nova conversa!</h2>
          </div>
        ) : (
          allRooms.map(
            (room) =>
              (currentContactSelected.email === room.first_user_email ||
                currentContactSelected.email === room.second_user_email) && (
                <Chat
                  key={room.id}
                  userData={userData}
                  currentContactSelected={currentContactSelected}
                  socket={socket}
                  room={room}
                />
              )
          )
        )}
      </div>

      {showAddContact && (
        <ModalAddContact
          setShowAddContact={setShowAddContact}
          setUserContacts={setUserContacts}
          userContacts={userContacts}
        />
      )}
    </div>
  );
}

export default Home;
