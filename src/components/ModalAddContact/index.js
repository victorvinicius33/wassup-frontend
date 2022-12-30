import './style.css';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { useState } from 'react';

function ModalAddContact({
  setShowAddContact,
  socket,
  getUserData,
  getAllChatRooms,
}) {
  const token = getItem('token');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleAddContact(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post(
        '/contact',
        {
          email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status > 204) return;

      getUserData();
      getAllChatRooms();
      setShowAddContact(false);
      await socket.emit('add_contact', response.data);
    } catch (error) {
      if (error.response.status <= 500) {
        return setError(error.response.data.message);
      }
    }
  }

  return (
    <div className='modal-add-contact__backdrop'>
      <div className='modal-add-contact__container'>
        <h2>Adicionar um novo contato</h2>
        <form className='modal-add-contact__form'>
          <input
            placeholder='Digite email do contato'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className='modal-add-contact__error'>{error}</span>}
          <div className='modal-add-contact__btns'>
            <button type='submit' onClick={handleAddContact}>
              Adicionar
            </button>
            <button type='button' onClick={() => setShowAddContact(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddContact;
