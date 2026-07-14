import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Scale, ShieldAlert, Lock, FileText } from 'lucide-react';
import './estilo/Nosotros.css';

export default function Legal() {
  return (
    <div className="nosotros-page">
      <Navbar />
      <main className="nosotros-container">
        <section className="nosotros-hero">
          <h1 className="hero-title">Aviso <span className="text-gradient">Legal</span></h1>
          <p className="hero-subtitle">
            Transparencia, claridad y compromiso. Conoce nuestros términos de servicio y nuestra exención de responsabilidad financiera.
          </p>
        </section>

        <section className="glass-panel">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={28} /> Términos de Servicio
          </h2>
          <p>
            Al utilizar los servicios de Inversión Segura, aceptas estar sujeto a estos términos y condiciones. Nuestra plataforma está diseñada para proveer herramientas analíticas e información sobre mercados bursátiles y finanzas personales. Inversión Segura se reserva el derecho de modificar estos términos en cualquier momento.
          </p>
          
          <div style={{ background: 'rgba(255, 77, 77, 0.1)', borderLeft: '4px solid #ff4d4d', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
            <h4 style={{ color: '#ff7675', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={20} /> Aviso de Riesgo
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              El uso de nuestras herramientas de análisis y gestión de portafolios conlleva riesgos inherentes al mercado financiero. Inversión Segura proporciona datos de carácter informativo y análisis estadísticos, pero NO constituye asesoramiento financiero ni recomendaciones de compra/venta. No garantizamos rendimientos específicos ni asumimos responsabilidad por las fluctuaciones del mercado o las decisiones tomadas en base a nuestra información.
            </p>
          </div>
        </section>

        <section className="glass-panel">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={28} /> Política de Privacidad
          </h2>
          <p>
            Tu privacidad y la seguridad de tu información financiera son de suma importancia para nosotros. Recopilamos y procesamos datos personales estrictamente para proveer, mejorar y asegurar nuestros servicios. No vendemos ni compartimos tu información financiera con terceros sin tu consentimiento explícito.
          </p>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '20px' }}>
            <ShieldAlert size={24} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0 }}>
              Toda la información almacenada en los servidores de Inversión Segura está protegida mediante encriptación de nivel bancario. Tienes el derecho absoluto de acceder, rectificar o eliminar tus datos en cualquier momento a través de tu panel de control o contactando a nuestro equipo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
