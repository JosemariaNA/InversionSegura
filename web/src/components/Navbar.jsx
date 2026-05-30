import { Link, useNavigate } from 'react-router-dom';

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
          <span className="logo-icon">💰</span>
          <span className="logo-text">InversionSegura</span>
        </Link>
        
        <div className="nav-links">
          {token ? (
            <>
              <div className="nav-user">
                <span className="user-greeting">👤 {nombre}</span>
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