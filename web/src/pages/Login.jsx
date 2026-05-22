import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('nombre', data.nombre);
      navigate('/');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Email"    type="email"    value={form.email}
        onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={handleSubmit}>Entrar</button>
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  );
}