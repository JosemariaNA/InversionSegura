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

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(16, 185, 129, 0.2);
          border-top-color: #10b981;
          border-right-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
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
        <div className="spinner"></div>
        <div className="loading-text">
          Cargando datos financieros<span className="loading-dots"></span>
        </div>
      </div>
    </div>
  );
}
