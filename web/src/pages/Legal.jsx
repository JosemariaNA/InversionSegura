import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './estilo/Nosotros.css';

export default function Legal() {
  return (
    <div className="nosotros-page">
      <Navbar />
      <main className="nosotros-container">
        <section className="nosotros-hero">
          <h1 className="hero-title">Aviso <span className="text-gradient">Legal</span></h1>
          <p className="hero-subtitle">
            Transparencia, claridad y compromiso. Conoce nuestros términos de servicio y cómo protegemos tu privacidad.
          </p>
        </section>

        <section className="business-idea-section" style={{textAlign: 'left', padding: '40px'}}>
          <h2 style={{color: 'var(--accent-teal)', marginBottom: '20px', fontSize: '1.5rem'}}>Términos de Servicio</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6'}}>
            Al utilizar los servicios de HighSpec, aceptas estar sujeto a estos términos y condiciones. Nuestros servicios están diseñados exclusivamente para uso corporativo y profesional. HighSpec se reserva el derecho de modificar estos términos en cualquier momento, notificando a los usuarios activos con 30 días de anticipación.
          </p>
          <p style={{color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6'}}>
            El uso de nuestros algoritmos de inversión y gestión de portafolios conlleva riesgos inherentes al mercado financiero. HighSpec proporciona herramientas de análisis predictivo, pero no garantiza rendimientos específicos ni asume responsabilidad por las fluctuaciones del mercado.
          </p>
        </section>

        <section className="business-idea-section" style={{textAlign: 'left', padding: '40px'}}>
          <h2 style={{color: 'var(--accent-teal)', marginBottom: '20px', fontSize: '1.5rem'}}>Política de Privacidad</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6'}}>
            Tu privacidad es de suma importancia para nosotros. Recopilamos y procesamos datos personales y corporativos estrictamente para proveer, mejorar y asegurar nuestros servicios. No vendemos ni compartimos tu información financiera con terceros sin tu consentimiento explícito.
          </p>
          <p style={{color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6'}}>
            Toda la información almacenada en los servidores de HighSpec está protegida mediante encriptación AES-256. Tienes el derecho absoluto de acceder, rectificar o eliminar tus datos en cualquier momento a través del panel de control de tu cuenta o contactando a nuestro equipo de privacidad.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
