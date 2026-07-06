import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './estilo/Inicio.css';

export default function Inicio() {
  return (
    <div className="inicio-wrapper">
      <div className="inicio-container">
        <div className="hero-section">
          <h1 className="hero-title">
            Toma el control de tu <br/><span className="text-gradient">Futuro Financiero</span>
          </h1>
          <p className="hero-subtitle">
            HighSpec te brinda las herramientas más avanzadas para gestionar tus ingresos, gastos e inversiones de forma inteligente y segura.
          </p>
          
          <div className="hero-actions">
            {localStorage.getItem('token') ? (
              <Link to="/control" className="btn-hero-primary">
                Ir a mi Panel Financiero
              </Link>
            ) : (
              <>
                <Link to="/registro" className="btn-hero-primary">
                  Comenzar Gratis
                </Link>
                <Link to="/login" className="btn-hero-secondary">
                  Ya tengo cuenta
                </Link>
              </>
            )}
          </div>

          <h2 className="section-title-features">Nuestras Soluciones de Inversión Integrales</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/icon_analisis.png" alt="Análisis" />
              </div>
              <h3>Análisis en Tiempo Real</h3>
              <p>Monitorea tus inversiones y gastos con gráficos detallados y precisos al instante.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/icon_seguridad.png" alt="Seguridad" />
              </div>
              <h3>Máxima Seguridad</h3>
              <p>Tus datos financieros están encriptados y protegidos con los más altos estándares.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/icon_decisiones.png" alt="Decisiones" />
              </div>
              <h3>Decisiones Inteligentes</h3>
              <p>Recibe recomendaciones y un control estricto de tu balance general y operaciones.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
