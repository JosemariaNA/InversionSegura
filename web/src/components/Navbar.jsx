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
      <Link to="/" className="nav-logo">📊 InversionSegura</Link>
      <div className="nav-links">
        {token ? (
          <>
            <span>Hola, {nombre}</span>
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registro">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}