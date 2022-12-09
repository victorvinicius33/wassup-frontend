import './style.css';
import Logo from '../../assets/logo.jpg';

function Header() {
  return (
    <div className='header'>
      <h1>Wassup!</h1>
      <div className='header__img-container'>
        <img src={Logo} alt='logo' />
      </div>
    </div>
  );
}

export default Header;
