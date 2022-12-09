/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validationSignUpForm } from '../../validations/validationSignUpForm';
import useGlobal from '../../hooks/useGlobal';
import api from '../../services/api';
import Header from '../../components/Header';

function SignUp() {
  const {
    setOpenModalSuccess,
    setSuccessMessage,
  } = useGlobal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');

    const formValidation = await validationSignUpForm({
      name,
      email,
      password,
      repeatPassword,
    });

    if (formValidation.error) {
      return setError(formValidation.errorMessage);
    }

    try {
      const response = await api.post('/user', {
        name,
        email,
        password,
        repeatPassword,
      });

      if (response.status > 204) return;

      handleClearForm();
      setSuccessMessage('Usuário cadastrado com sucesso!');
      setOpenModalSuccess(true);
      navigate('/');
    } catch (error) {
      if (error.response.status >= 500) {
        return;
      }

      setError(error.response.data.message);
    }
  }

  function handleClearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  }

  return (
    <div className='sign-up'>
      <Header />
      
      <div className='sign-up__main'>
        <h2>Cadastre-se</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nome</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <label htmlFor='confirm-password'>Confirmação de senha</label>
          <input
            id='confirm-password'
            type='password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          {error && <p className='sign-up__error-message'>{error}</p>}

          <button>Cadastrar</button>
        </form>

        <Link to='/' className='link-to-sign-in'>
          Já tem cadastro? Clique aqui!
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
