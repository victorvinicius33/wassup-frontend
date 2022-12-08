import './style.css';
import { clear } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

function ModalOptions({ setShowAddContact }) {
  const navigate = useNavigate();

  function handleLogout() {
    clear();
    navigate('/');
  }

  return (
    <div className='modal-options'>
      <ul>
        <div>
          <li onClick={() => setShowAddContact(true)}>Adicionar contato</li>
        </div>
        <div>
          <li onClick={handleLogout}>Desconectar</li>
        </div>
      </ul>
    </div>
  );
}

export default ModalOptions;
