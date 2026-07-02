import cargaGif from '../recursos/carga.gif';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <style>{`
        .loading-spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          padding: 48px 56px;
          background: rgba(18, 24, 36, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: spinnerFadeIn 0.6s ease-out;
        }

        @keyframes spinnerFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .spinner-image {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 0 16px rgba(238, 193, 93, 0.2));
        }

        .loading-text {
          color: #C9CDD3;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.3px;
          font-family: 'Inter', sans-serif;
        }

        .loading-dots::after {
          content: '.';
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
      `}</style>

      <div className="loading-spinner">
        <img src={cargaGif} alt="Cargando..." className="spinner-image" />
        <div className="loading-text">
          Cargando datos financieros<span className="loading-dots"></span>
        </div>
      </div>
    </div>
  );
}
