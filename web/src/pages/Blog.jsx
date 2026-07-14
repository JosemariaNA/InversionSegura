import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, BookOpen, Clock, TrendingUp } from 'lucide-react';
import './estilo/Blog.css';

export default function Blog() {
  return (
    <div className="blog-wrapper">
      <Navbar />
      <main className="blog-container">
        <section className="blog-hero">
          <h1 className="blog-hero-title">Inversión Segura <span className="text-gradient">Insights</span></h1>
          <p className="blog-hero-subtitle">
            Noticias, consejos e ideas sobre educación financiera, análisis del mercado y estrategias de ahorro.
          </p>
        </section>

        <section className="articles-section">
          <h2 className="section-title-blog">Artículos Destacados</h2>
          
          <div className="articles-grid">
            <article className="article-card">
              <div className="article-meta">
                <span className="article-category">Finanzas</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} /> 14 Jul 2026
                </span>
              </div>
              <h3 className="article-title">Cómo interpretar el Estado de Resultados</h3>
              <p className="article-excerpt">
                Aprende a leer los márgenes operativos, utilidad neta y EBITDA para identificar empresas sólidas antes de invertir.
              </p>
              <a href="#" className="article-read-more" onClick={(e) => e.preventDefault()}>
                Leer Artículo <ArrowRight size={16} />
              </a>
            </article>

            <article className="article-card">
              <div className="article-meta">
                <span className="article-category">Presupuesto</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} /> 10 Jul 2026
                </span>
              </div>
              <h3 className="article-title">5 Reglas para un Presupuesto Exitoso</h3>
              <p className="article-excerpt">
                Descubre la regla 50/30/20 y cómo aplicarla en nuestro módulo de control financiero para mejorar tus ahorros.
              </p>
              <a href="#" className="article-read-more" onClick={(e) => e.preventDefault()}>
                Leer Artículo <ArrowRight size={16} />
              </a>
            </article>

            <article className="article-card">
              <div className="article-meta">
                <span className="article-category">Inversión</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} /> 05 Jul 2026
                </span>
              </div>
              <h3 className="article-title">Entendiendo el Beta de una Acción</h3>
              <p className="article-excerpt">
                ¿Por qué el riesgo sistémico es clave al diversificar tu portafolio? Aprende a equilibrar riesgo y retorno.
              </p>
              <a href="#" className="article-read-more" onClick={(e) => e.preventDefault()}>
                Leer Artículo <ArrowRight size={16} />
              </a>
            </article>
          </div>
        </section>

        <section className="coming-soon-banner">
          <BookOpen size={40} color="var(--accent-teal)" style={{ marginBottom: '15px' }} />
          <h3>Más contenido en camino</h3>
          <p>
            Estamos trabajando en más artículos para potenciar tus conocimientos sobre el mercado financiero actual. Vuelve pronto para descubrir nuestras nuevas publicaciones.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
