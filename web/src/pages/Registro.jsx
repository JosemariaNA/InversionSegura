import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Registro() {
  const [form, setForm]   = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/api/auth/registro', form);
      navigate('/login');
    } catch {
      setError('Error al registrarse. El email puede ya estar en uso.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      {error && <p className="error">{error}</p>}
      <input placeholder="Nombre"   value={form.nombre}
        onChange={e => setForm({...form, nombre: e.target.value})} />
      <input placeholder="Email"    type="email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({...form, password: e.target.value})} />
      <button onClick={handleSubmit}>Registrarse</button>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}