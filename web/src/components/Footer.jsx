import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="business-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Páginas Principales</h4>
          <Link to="/">Inicio</Link>
        </div>
        <div className="footer-column">
          <h4>Recursos</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/ayuda">Ayuda</Link>
        </div>
        <div className="footer-column">
          <h4>Acerca de Nosotros</h4>
          <Link to="/nosotros">Nuestro Equipo y Misión</Link>
        </div>
        <div className="footer-column">
          <h4>Aviso Legal</h4>
          <Link to="/legal">Términos y Privacidad</Link>
        </div>
        <div className="footer-column footer-social">
          <div className="social-icons">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20">
                <path fill="currentColor" d="M8 1C4.13 1 1 4.15 1 8.04c0 3.51 2.56 6.43 5.91 6.96v-4.92H5.13V8.04h1.78V6.49c0-1.77 1.05-2.74 2.64-2.74c.77 0 1.57.14 1.57.14v1.73h-.88c-.87 0-1.14.54-1.14 1.1v1.32h1.94l-.31 2.04H9.1V15c3.35-.53 5.91-3.44 5.91-6.96c0-3.89-3.13-7.04-7-7.04Z"></path>
              </svg>
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <g fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m-3 5a3 3 0 1 0 6 0a3 3 0 0 0-6 0" clipRule="evenodd"></path>
                  <path d="M18 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2"></path>
                  <path fillRule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm14 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" clipRule="evenodd"></path>
                </g>
              </svg>
            </span>
            <span>
              <svg viewBox="0 0 48 48" width="20" height="20">
                <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M38.74,16.55v1c0,10.07-7.64,21.61-21.62,21.61A21.14,21.14,0,0,1,5.5,35.71a12.22,12.22,0,0,0,1.81.11,15.25,15.25,0,0,0,9.44-3.24,7.56,7.56,0,0,1-7.1-5.29,6.9,6.9,0,0,0,1.44.15,7.53,7.53,0,0,0,2-.27A7.57,7.57,0,0,1,7,19.72v-.1a7.42,7.42,0,0,0,3.44.94A7.54,7.54,0,0,1,8.05,10.5a21.58,21.58,0,0,0,15.68,7.94,6.38,6.38,0,0,1-.21-1.74,7.55,7.55,0,0,1,13.17-5.31,15.59,15.59,0,0,0,4.83-1.85,7.65,7.65,0,0,1-3.39,4.27,15.87,15.87,0,0,0,4.37-1.26,15.56,15.56,0,0,1-3.76,4Z"></path>
              </svg>
            </span>
            <span>
              <svg viewBox="0 -3 20 20" width="20" height="20">
                <g stroke="none" strokeWidth="1" fillRule="evenodd">
                  <g transform="translate(-300.000000, -7442.000000)" fill="currentColor">
                    <g transform="translate(56.000000, 160.000000)">
                      <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </div>
          <div className="copyright">© 2026 Inversión Segura. Todos los derechos reservados.</div>
        </div>
      </div>
    </footer>
  );
}
