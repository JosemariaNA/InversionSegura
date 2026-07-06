import Navbar from '../components/Navbar';
import { Laptop, Package, Smartphone, Settings, Store, Rocket } from 'lucide-react';
import Footer from '../components/Footer';
import './estilo/Nosotros.css';

export default function Nosotros() {
  return (
    <div className="nosotros-page">
      <Navbar />
      
      <main className="nosotros-container">
        {/* Hero Section */}
        <section className="nosotros-hero">
          <h1 className="hero-title">Acerca de <span className="text-gradient">HighSpec</span></h1>
          <p className="hero-subtitle">
            Somos una empresa de desarrollo de software que ofrece soluciones digitales personalizadas 
            para llevar a las pequeñas y medianas empresas (pymes) al siguiente nivel.
          </p>
        </section>

        {/* Business Idea */}
        <section className="business-idea-section">
          <h2>Nuestra Idea de Negocio</h2>
          <div className="idea-grid">
            <div className="idea-card">
              <div className="icon-wrapper"><Laptop size={32} color="#10b981" /></div>
              <h3>Desarrollo Web</h3>
              <p>Creación de páginas web modernas y optimizadas.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><Package size={32} color="#10b981" /></div>
              <h3>Sistemas de Gestión</h3>
              <p>Software a medida para inventarios y ventas.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><Smartphone size={32} color="#10b981" /></div>
              <h3>Apps Móviles</h3>
              <p>Aplicaciones móviles básicas e intuitivas.</p>
            </div>
            <div className="idea-card">
              <div className="icon-wrapper"><Settings size={32} color="#10b981" /></div>
              <h3>Automatización</h3>
              <p>Automatización de procesos repetitivos básicos.</p>
            </div>
          </div>
          <p className="freelance-text">
            * También operamos de forma global mediante plataformas como Freelancer y Upwork para conectar con clientes de todo el mundo.
          </p>
        </section>

        {/* Problem vs Solution */}
        <section className="problem-solution-section">
          <h2 className="section-title">El Cambio que Impulsamos</h2>
          <div className="ps-grid">
            {/* Problemas */}
            <div className="ps-column problems">
              <h3 className="column-title">Problemas que resolvemos</h3>
              <div className="ps-item">
                <h4>No tienen sistemas digitales</h4>
                <p>Las pymes no cuentan con software especializado para gestionar sus operaciones.</p>
              </div>
              <div className="ps-item">
                <h4>Llevan control manual</h4>
                <p>Registran información en Excel o cuadernos, limitando la organización y análisis.</p>
              </div>
              <div className="ps-item">
                <h4>Pérdida de tiempo y dinero</h4>
                <p>Los procesos manuales hacen que las tareas tomen más tiempo por desorganización.</p>
              </div>
            </div>
            
            {/* Soluciones */}
            <div className="ps-column solutions">
              <h3 className="column-title">Nuestra Solución</h3>
              <div className="ps-item">
                <h4>Automatiza procesos</h4>
                <p>Ejecución de tareas repetitivas de forma rápida y eficiente mediante sistemas digitales.</p>
              </div>
              <div className="ps-item">
                <h4>Reduce errores</h4>
                <p>Plataformas que registran y procesan la información de manera precisa y segura.</p>
              </div>
              <div className="ps-item">
                <h4>Mejora la productividad</h4>
                <p>Herramientas que agilizan el trabajo y optimizan el tiempo del personal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Target Client */}
        <section className="target-client-section">
          <h2 className="section-title">Nuestro Cliente Objetivo</h2>
          <div className="clients-grid">
            <div className="client-card">
              <h4><Store size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Pequeñas Empresas</h4>
              <p>Negocios tradicionales operando (restaurantes, bodegas) que aún no están digitalizados.</p>
            </div>
            <div className="client-card">
              <h4><Laptop size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Emprendedores Digitales</h4>
              <p>Personas que generan ingresos por internet sin local físico (cursos online, servicios).</p>
            </div>
            <div className="client-card">
              <h4><Rocket size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Startups</h4>
              <p>Empresas nuevas con ideas innovadoras que necesitan prototipos o productos MVP.</p>
            </div>
          </div>
          <div className="segmentation-box">
            <h4>Segmentación</h4>
            <ul>
              <li><strong>Edad:</strong> 25-50 años (dueños o administradores)</li>
              <li><strong>Ubicación:</strong> Perú y clientes internacionales (online)</li>
              <li><strong>Nivel Tecnológico:</strong> Básico - Intermedio</li>
            </ul>
          </div>
        </section>

        {/* Founders */}
        <section className="founders-section">
          <h2 className="section-title">Nuestros Fundadores</h2>
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
