import '../styles/Header.css';
import { logOut } from "../firebase/auth";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, role } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__button">🏠 Home</a>
        {role === 'admin' && (
          <a href="/admin" className="header__admin">🛠️</a>
        )}
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
            <button onClick={logOut}>🔓 Log out</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;