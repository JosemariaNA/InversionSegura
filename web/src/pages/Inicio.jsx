import { Link } from 'react-router-dom';
import { BarChart2, ShieldCheck, Lightbulb, Wallet, Search, TrendingUp } from 'lucide-react';
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
            Inversión Segura te brinda las herramientas más avanzadas para gestionar tus finanzas personales, controlar tus gastos y analizar el mercado bursátil de forma inteligente.
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

        </div>
      </div>

      <div className="section-divider-curve">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path className="wave-fill-features" d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="features-section">
        <h2 className="section-title-features">Nuestras Soluciones de Inversión Integrales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart2 size={40} strokeWidth={1.5} />
            </div>
            <h3>Análisis en Tiempo Real</h3>
            <p>Monitorea tus inversiones y gastos con gráficos detallados y precisos al instante.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={40} strokeWidth={1.5} />
            </div>
            <h3>Máxima Seguridad</h3>
            <p>Tus datos financieros están encriptados y protegidos con los más altos estándares.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Lightbulb size={40} strokeWidth={1.5} />
            </div>
            <h3>Decisiones Inteligentes</h3>
            <p>Recibe recomendaciones y un control estricto de tu balance general y operaciones.</p>
          </div>
        </div>
      </div>

      <div className="section-divider-curve features-to-how">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path className="wave-fill-how" d="M0,60 C480,140 960,-20 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="how-it-works-section">
        <h2 className="section-title-features">¿Cómo funciona Inversión Segura?</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <Wallet size={40} color="var(--accent-gold)" style={{marginBottom: '10px'}} />
              <h4>Conecta tus Finanzas</h4>
              <p>Registra tus ingresos y gastos para conocer tu liquidez real.</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <Search size={40} color="var(--accent-teal)" style={{marginBottom: '10px'}} />
              <h4>Analiza Empresas</h4>
              <p>Explora métricas clave, EBITDA y estados financieros de forma intuitiva.</p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <TrendingUp size={40} color="var(--accent-gold)" style={{marginBottom: '10px'}} />
              <h4>Multiplica tu Capital</h4>
              <p>Toma decisiones informadas y visualiza el crecimiento de tu portafolio.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
