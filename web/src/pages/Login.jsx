import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './estilo/Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('nombre', data.nombre);
      navigate('/');
    } catch {
      setError('Credenciales incorrectas');
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
            <h1>HighSpec</h1>
            <h2>Iniciar Sesión</h2>
            <p className="auth-subtitle">Accede a tu panel financiero</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="auth-error">{error}</div>}
            
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
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}