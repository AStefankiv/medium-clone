import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="https://github.com/AStefankiv" target="_blank">Github</a>
      </div>
      <div className="footer__center">
        <p><strong>Medium Clone - {new Date().getFullYear()}</strong></p>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/andrii-stefankiv/" target="_blank">Linked In</a>
      </div>
    </footer>
  );
};

export default Footer;