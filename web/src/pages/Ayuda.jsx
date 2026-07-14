import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HelpCircle, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import './estilo/Nosotros.css';

export default function Ayuda() {
  return (
    <div className="nosotros-page">
      <Navbar />
      <main className="nosotros-container">
        <section className="nosotros-hero">
          <h1 className="hero-title">Centro de <span className="text-gradient">Ayuda</span></h1>
          <p className="hero-subtitle">
            Estamos aquí para resolver tus dudas y apoyarte en el uso de Inversión Segura.
          </p>
        </section>

        <section className="problem-solution-section">
          <div className="ps-grid" style={{gridTemplateColumns: '1fr'}}>
            <div className="ps-column faq-list">
              <h3 className="column-title" style={{color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>
                <HelpCircle size={28} color="var(--accent-gold)" /> Preguntas Frecuentes
              </h3>
              
              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>
                  <Info size={18} /> ¿Cómo registro mis ingresos y gastos?
                </h4>
                <p>Ve a tu panel de Control Financiero desde el menú principal. Allí podrás añadir nuevos movimientos categorizados, visualizar tus gráficas de ingresos vs gastos y mantener tu balance al día.</p>
              </div>

              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>
                  <Info size={18} /> ¿De dónde provienen los datos del análisis bursátil?
                </h4>
                <p>Integramos APIs financieras confiables que proveen datos históricos y estados financieros auditados de las principales bolsas de valores a nivel global.</p>
              </div>

              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>
                  <Info size={18} /> ¿Qué significa el margen EBITDA?
                </h4>
                <p>El margen EBITDA muestra la rentabilidad operativa de una empresa antes de intereses, impuestos, depreciaciones y amortizaciones. Es clave para comparar el desempeño operativo entre diferentes empresas.</p>
              </div>
              
              <h3 className="column-title" style={{color: '#fff', marginTop: '60px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>
                <MessageSquare size={28} color="var(--accent-gold)" /> Soporte Técnico
              </h3>
              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>
                  <ShieldAlert size={18} /> Contacto Directo
                </h4>
                <p>¿No encontraste lo que buscabas? Escríbenos a soporte@inversionsegura.com y uno de nuestros agentes te responderá a la brevedad.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
