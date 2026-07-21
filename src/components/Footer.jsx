import { FiInstagram, FiFacebook, FiMessageCircle, FiMail, FiClock, FiMapPin } from 'react-icons/fi';

const Footer = () => (
  <footer className="footer">
    <div>
      <h3>Mega Cloud Vape Shop</h3>
      <p>Diseño, calidad y asesoría premium para tus compras de vapeo.</p>
    </div>
    <div className="footer__links">
      <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
      <a href="https://wa.me/56900000000" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FiMessageCircle /></a>
      <a href="mailto:hola@megacloud.cl" aria-label="Correo"><FiMail /></a>
    </div>
    <div className="footer__info">
      <p><FiClock /> Lun - Vie: 10:30 - 21:00</p>
      <p><FiMapPin /> Av. Providencia 123, Santiago</p>
    </div>
  </footer>
);

export default Footer;
