import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export default function Navbar() {
  const navigate  = useNavigate();
  const nombre    = localStorage.getItem('nombre');
  const token     = localStorage.getItem('token');

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">
            <img src="/logo.jpg" alt="Logo" className="logo-image" />
          </span>
          <span className="logo-text">Inversión Segura</span>
        </Link>
        
        <div className="nav-links">
          {token ? (
            <>
              <div className="nav-user">
                <Link to="/control" className="nav-link nav-link-primary" style={{ marginRight: '15px' }}>Ir al Panel</Link>
                <span className="user-greeting"><User size={18} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> {nombre}</span>
                <button onClick={cerrarSesion} className="nav-logout">
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Inicia Sesión</Link>
              <Link to="/registro" className="nav-link nav-link-primary">Regístrate</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}