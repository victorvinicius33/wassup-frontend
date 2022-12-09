/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validationLoginForm } from '../../validations/validationLoginForm';
import { setItem, getItem } from '../../utils/localStorage';
import useGlobal from '../../hooks/useGlobal';
import api from '../../services/api';

function SignIn() {
  const { setUserData, setUserContacts } = useGlobal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem('token');

    if (token) {
      navigate('/home');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');

    const formValidation = await validationLoginForm({
      email,
      password,
    });

    if (formValidation.error) {
      return setError(formValidation.errorMessage);
    }

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      if (response.status > 204) return;

      const { token } = response.data;

      setItem('token', token);

      handleClearForm();
      navigate('/home');
    } catch (error) {
      if (error.response.status >= 500) {
        return;
      }

      setError(error.response.data.message);
    }
  }

  function handleClearForm() {
    setEmail('');
    setPassword('');
  }

  return (
    <div className='sign-in'>
      <main className='sign-in__main'>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <span className='sign-in__error-message'>{error}</span>}
          <button className='sign-in__btn-submit'>Entrar</button>
        </form>
        <Link className='link-to-sign-up' to='/sign-up'>
          Não tem conta? clique para cadastrar!
        </Link>
      </main>
    </div>
  );
}

export default SignIn;
