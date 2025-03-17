import './Header.scss';
import { logOut } from "../../firebase/auth";
import { useAuth } from '../../context/AuthContext';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { ToolFilled } from '@ant-design/icons';
import { UnlockFilled } from '@ant-design/icons';

const Header = () => {
  const { user, role } = useAuth();

  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__button">
        <HomeFilled
        style={{
          fontSize: '20px',
          color: '#bae0ff',
          }}/> Home</a>
        {role === 'admin' && (
          // <a href="/admin" className="header__admin">🛠️</a>
          <Button
          type="purple"
          shape="circle"
          size="large"
          href="/admin"
          className='header__admin'
          ><ToolFilled
          style={{
            fontSize: '20px',
            color: '#bae0ff',
          }}
          /></Button>
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
            <button onClick={logOut}>
              <UnlockFilled
                style={{
                  fontSize: '20px',
                  color: '#ffc53d',
                  }}/> Log out</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;