import Navbar from '../components/Navbar';
import { LineChart, ShieldCheck, TrendingUp, PieChart, Target, Zap } from 'lucide-react';
import Footer from '../components/Footer';
import './estilo/Nosotros.css';

export default function Nosotros() {
  return (
    <div className="nosotros-page">
      <Navbar />
      
      <main className="nosotros-container">
        {/* Hero Section */}
        <section className="nosotros-hero">
          <h1 className="hero-title">Acerca de <span className="text-gradient">Inversión Segura</span></h1>
          <p className="hero-subtitle">
            Nuestra misión es democratizar el acceso a herramientas financieras avanzadas, permitiendo que cualquier persona tome decisiones inteligentes sobre sus ingresos, gastos e inversiones bursátiles.
          </p>
        </section>

        {/* Business Idea */}
        <section className="glass-panel">
          <h2 style={{textAlign: 'center'}}>Nuestra Propuesta de Valor</h2>
          <div className="idea-grid">
            <div className="idea-card">
              <div className="icon-wrapper"><LineChart size={32} color="#58B6A6" /></div>
              <h3>Análisis Bursátil</h3>
              <p>Datos estadísticos precisos y actualizados del mercado financiero.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><PieChart size={32} color="#58B6A6" /></div>
              <h3>Control de Gastos</h3>
              <p>Herramientas intuitivas para gestionar y categorizar tu presupuesto.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><ShieldCheck size={32} color="#58B6A6" /></div>
              <h3>Seguridad Total</h3>
              <p>Protegemos tu información financiera con encriptación de grado bancario.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><TrendingUp size={32} color="#58B6A6" /></div>
              <h3>Crecimiento</h3>
              <p>Te ayudamos a identificar oportunidades de inversión y ahorro.</p>
            </div>
          </div>
          <p className="freelance-text">
            * Con Inversión Segura, tienes el poder de una firma de análisis financiero directamente en tu bolsillo.
          </p>
        </section>

        {/* Problem vs Solution */}
        <section className="problem-solution-section">
          <h2 className="section-title">El Cambio que Impulsamos</h2>
          <div className="ps-grid">
            {/* Problemas */}
            <div className="ps-column problems">
              <h3 className="column-title">El Problema</h3>
              <div className="ps-item">
                <h4>Desorganización Financiera</h4>
                <p>Muchas personas no tienen claro a dónde va su dinero y viven al día.</p>
              </div>
              <div className="ps-item">
                <h4>Falta de Información</h4>
                <p>El análisis bursátil suele ser complejo y reservado para profesionales.</p>
              </div>
              <div className="ps-item">
                <h4>Inseguridad al Invertir</h4>
                <p>Miedo a tomar malas decisiones por falta de datos claros y métricas fáciles de entender.</p>
              </div>
            </div>
            
            {/* Soluciones */}
            <div className="ps-column solutions">
              <h3 className="column-title">Nuestra Solución</h3>
              <div className="ps-item">
                <h4>Gestión Centralizada</h4>
                <p>Un panel unificado para llevar el control milimétrico de ingresos y egresos.</p>
              </div>
              <div className="ps-item">
                <h4>Métricas Claras</h4>
                <p>Transformamos datos complejos del mercado de valores en gráficos fáciles de leer.</p>
              </div>
              <div className="ps-item">
                <h4>Empoderamiento</h4>
                <p>Brindamos las herramientas necesarias para que inviertas con confianza y estrategia.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Client */}
        <section className="target-client-section">
          <h2 className="section-title">¿Para quién es Inversión Segura?</h2>
          <div className="clients-grid">
            <div className="client-card">
              <h4><Target size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Inversores Iniciales</h4>
              <p>Personas que buscan dar sus primeros pasos en el mercado bursátil con datos confiables.</p>
            </div>
            <div className="client-card">
              <h4><Zap size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Gestores de Finanzas</h4>
              <p>Quienes desean optimizar su economía personal mediante el control estricto de su capital.</p>
            </div>
            <div className="client-card">
              <h4><LineChart size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Analistas Independientes</h4>
              <p>Inversores experimentados que requieren acceso rápido a estados financieros y gráficas históricas.</p>
            </div>
          </div>
          <div className="segmentation-box">
            <h4>Nuestra Comunidad</h4>
            <ul>
              <li><strong>Perfil:</strong> Proactivo, orientado al crecimiento y la libertad financiera.</li>
              <li><strong>Objetivo:</strong> Maximizar el retorno de inversión y reducir gastos hormiga.</li>
              <li><strong>Alcance:</strong> Global, con acceso a mercados internacionales.</li>
            </ul>
          </div>
        </section>

        {/* Founders */}
        <section className="founders-section">
          <h2 className="section-title">Nuestro Equipo Fundador</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-avatar">LB</div>
              <h3>Lazaro Barrientos</h3>
              <p>Eduardo Enrique</p>
            </div>
            <div className="founder-card">
              <div className="founder-avatar">NA</div>
              <h3>Napan Aparcana</h3>
              <p>Josemaría</p>
            </div>
            <div className="founder-card">
              <div className="founder-avatar">RL</div>
              <h3>Rocha Luna</h3>
              <p>Junior Duvan</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer principal */}
      <Footer />
    </div>
  );
}
