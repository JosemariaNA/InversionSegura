import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './estilo/Registro.css';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/auth/registro', form);
      navigate('/login');
    } catch {
      setError('Error al registrarse. El email puede ya estar en uso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background"></div>
      <div className="auth-overlay"></div>
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>InversionSegura</h1>
            <h2>Crear Cuenta</h2>
            <p className="auth-subtitle">Únete a nuestra plataforma financiera</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input 
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={e => setForm({...form, nombre: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input 
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}