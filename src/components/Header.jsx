import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <a href="/" className="header__button">Home</a>
      </div>
      <div className="header__right">
        <a href="/login" className="header__button">Login</a>
      </div>
    </header>
  );
};

export default Header;