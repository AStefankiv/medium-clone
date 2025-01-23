import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__button">Home</button>
      </div>
      <div className="header__right">
        <button className="header__button">Login</button>
      </div>
    </header>
  );
};

export default Header;