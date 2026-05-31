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
          background: linear-gradient(135deg, #050505 0%, #0a0a0a 100%);
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .spinner-image {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }

        .loading-text {
          color: #e2e8f0;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .loading-dots::after {
          content: '.';
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes dots {
          0%, 20% {
            content: '';
          }
          40% {
            content: '.';
          }
          60% {
            content: '..';
          }
          80%, 100% {
            content: '...';
          }
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
