import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './estilo/Nosotros.css';

export default function Blog() {
  return (
    <div className="nosotros-page">
      <Navbar />
      <main className="nosotros-container">
        <section className="nosotros-hero">
          <h1 className="hero-title">Nuestro <span className="text-gradient">Blog</span></h1>
          <p className="hero-subtitle">
            Noticias, consejos e insights sobre finanzas corporativas, inversiones y tecnología.
          </p>
        </section>

        <section className="business-idea-section" style={{textAlign: 'left', padding: '40px'}}>
          <h2 style={{color: 'var(--accent-teal)', marginBottom: '20px', fontSize: '1.5rem'}}>Últimos Artículos</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6'}}>
            Estamos trabajando en nuevos artículos para potenciar tus conocimientos sobre el mercado financiero actual. Vuelve pronto para descubrir nuestras publicaciones exclusivas.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
