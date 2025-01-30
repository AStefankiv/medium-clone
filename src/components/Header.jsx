import '../styles/Header.css';
import LogoutButton from './LogoutButton';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__button">🏠 Home</a>
      </div>
      {!user ? (
      <div className="header__right">
        <a href="/login" className="header__button">🔒 Login</a>
      </div>
      ) : (
        <div className="header__user">
          <div className="user-info">
            <p>{user.email}</p>
          </div>
          <div className="header__right">
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;