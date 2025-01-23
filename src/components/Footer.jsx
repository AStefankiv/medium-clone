import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__center">
        <p>Medium Clone - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;