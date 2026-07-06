import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './estilo/Nosotros.css';

export default function Ayuda() {
  return (
    <div className="nosotros-page">
      <Navbar />
      <main className="nosotros-container">
        <section className="nosotros-hero">
          <h1 className="hero-title">Centro de <span className="text-gradient">Ayuda</span></h1>
          <p className="hero-subtitle">
            Estamos aquí para resolver tus dudas y apoyarte en el uso de HighSpec.
          </p>
        </section>

        <section className="problem-solution-section">
          <div className="ps-grid" style={{gridTemplateColumns: '1fr'}}>
            <div className="ps-column">
              <h3 className="column-title" style={{color: '#fff'}}>Soporte Técnico</h3>
              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>Contacto Directo</h4>
                <p>Escríbenos a soporte@highspec.com y uno de nuestros agentes te responderá a la brevedad.</p>
              </div>
              <div className="ps-item">
                <h4 style={{color: 'var(--accent-teal)'}}>Preguntas Frecuentes</h4>
                <p>Pronto lanzaremos nuestra base de conocimientos con tutoriales paso a paso para ayudarte a configurar tus portafolios.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
