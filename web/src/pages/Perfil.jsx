import { useState, useEffect } from 'react';
import { FileEdit, User, Mail, Phone, Lock, Unlock, LockKeyhole, Bell, Info } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api';
import './estilo/Perfil.css';

// 9 avatars to choose from
const AVATARES = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Eden&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leah&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aidan&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Destiny&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude&backgroundColor=d1d4f9'
];

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  
  const [perfil, setPerfil] = useState({
    nombre: '',
    email: '',
    telefono: '',
    avatar_url: AVATARES[0]
  });

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    avatar_url: '',
    passwordActual: '',
    passwordNueva: '',
    passwordConfirmar: ''
  });

  const [mostrarModalAvatar, setMostrarModalAvatar] = useState(false);

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      setCargando(true);
      const res = await api.get('/api/auth/perfil');
      const datos = {
        nombre: res.data.nombre || '',
        email: res.data.email || '',
        telefono: res.data.telefono || '',
        avatar_url: res.data.avatar_url || AVATARES[0]
      };
      setPerfil(datos);
      setForm({ ...datos, passwordActual: '', passwordNueva: '', passwordConfirmar: '' });
    } catch (err) {
      console.error(err);
      setError('Error al cargar el perfil');
    } finally {
      setCargando(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    setError('');
    setExito('');

    if (form.passwordNueva && form.passwordNueva !== form.passwordConfirmar) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    try {
      await api.put('/api/auth/perfil', {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        avatar_url: form.avatar_url,
        passwordActual: form.passwordActual,
        passwordNueva: form.passwordNueva
      });

      setExito('Perfil actualizado exitosamente');
      setPerfil({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        avatar_url: form.avatar_url
      });
      // Limpiar campos de contraseña tras guardar
      setForm({ ...form, passwordActual: '', passwordNueva: '', passwordConfirmar: '' });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar los cambios');
    }
  };

  const cancelarEdicion = () => {
    setForm({ ...perfil, passwordActual: '', passwordNueva: '', passwordConfirmar: '' });
    setError('');
    setIsEditing(false);
  };

  if (cargando) return <DashboardLayout><div style={{color:'white', padding: '40px'}}>Cargando perfil...</div></DashboardLayout>;

  const handleSeleccionarAvatar = (avatar) => {
    setForm({ ...form, avatar_url: avatar });
    setMostrarModalAvatar(false);
  };

  const renderViewMode = () => (
    <div className="perfil-view">
      <div className="perfil-banner">
        <h1 className="perfil-header-title">Perfil de Usuario</h1>
        <div className="banner-pattern"></div>
      </div>
      
      <div className="perfil-info-main">
        <div className="avatar-large">
          <img src={perfil.avatar_url} alt="avatar" />
        </div>
        <div className="perfil-names">
          <h2>{perfil.nombre}</h2>
          <span>@{perfil.nombre.toLowerCase().replace(/\s+/g, '_')}</span>
        </div>
        <div className="perfil-actions-top-right">
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            <FileEdit size={16} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Editar Perfil
          </button>
        </div>
      </div>

      {exito && <div className="mensaje-exito" style={{background: 'rgba(46, 204, 113, 0.1)', color: '#2ECC71', padding: '12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(46, 204, 113, 0.3)', textAlign: 'center'}}>{exito}</div>}

      <div className="perfil-panels">
        <div className="perfil-panel">
          <div className="panel-header">
            <span className="icon-circle"><Info size={24} /></span>
            <h3>Detalles del Perfil</h3>
          </div>
          <div className="panel-body">
            <div className="info-row">
              <span className="icon"><User size={24} color="#10b981" /></span>
              <div className="info-text">
                <span className="label">Nombre Completo:</span>
                <span className="value">{perfil.nombre}</span>
              </div>
            </div>
            <div className="info-row">
              <span className="icon"><Mail size={24} color="#10b981" /></span>
              <div className="info-text">
                <span className="label">Correo Electrónico:</span>
                <span className="value">{perfil.email}</span>
              </div>
            </div>
            <div className="info-row">
              <span className="icon"><Phone size={24} color="#10b981" /></span>
              <div className="info-text">
                <span className="label">Teléfono:</span>
                <span className="value">{perfil.telefono || 'No registrado'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="perfil-panel">
          <div className="panel-header">
            <span className="icon-circle"><Lock size={24} /></span>
            <h3>Seguridad de Cuenta</h3>
          </div>
          <div className="panel-body">
            <div className="info-row">
              <span className="icon"><Unlock size={24} color="#3b82f6" /></span>
              <div className="info-text">
                <span className="label">Contraseña:</span>
                <span className="value">Protegida</span>
              </div>
            </div>
            <div className="info-row">
              <span className="icon"><LockKeyhole size={24} color="#3b82f6" /></span>
              <div className="info-text">
                <span className="label">Doble Factor (2FA):</span>
                <span className="value">Habilitada</span>
              </div>
            </div>
            <div className="info-row">
              <span className="icon"><Bell size={24} color="#3b82f6" /></span>
              <div className="info-text">
                <span className="label">Alertas de Inicio:</span>
                <span className="value">Activas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <div className="perfil-edit">
      <h1 className="perfil-header-title">Configuración de Mi Perfil</h1>
      
      {error && <div className="mensaje-error" style={{background: 'rgba(225, 90, 90, 0.1)', color: '#E15A5A', padding: '12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid rgba(225, 90, 90, 0.3)', textAlign: 'center'}}>{error}</div>}

      <div className="perfil-panels edit-panels">
        <div className="edit-column">
          <div className="perfil-panel">
            <div className="panel-header">
              <span className="icon-circle"><Info size={24} /></span>
              <h3>Información Básica</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleInputChange} className="input-glass active" />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={form.email} onChange={handleInputChange} className="input-glass" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" name="telefono" value={form.telefono} onChange={handleInputChange} className="input-glass" />
              </div>
            </div>
          </div>

          <div className="perfil-panel avatar-panel">
            <h3>Avatar</h3>
            <div className="avatar-edit-section">
              <div className="avatar-medium">
                <img src={form.avatar_url} alt="avatar" />
              </div>
              <div className="avatar-edit-info">
                <span>Foto de Perfil Actual</span>
                <button className="btn-actualizar-foto" onClick={() => setMostrarModalAvatar(true)}>Actualizar Foto</button>
              </div>
            </div>
          </div>
        </div>

        <div className="edit-column">
          <div className="perfil-panel">
            <div className="panel-header">
              <span className="icon-circle"><Lock size={24} /></span>
              <h3>Seguridad y Contraseña</h3>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input type="password" name="passwordActual" value={form.passwordActual} onChange={handleInputChange} placeholder="••••••••••" className="input-glass" />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input type="password" name="passwordNueva" value={form.passwordNueva} onChange={handleInputChange} className="input-glass" />
              </div>
              <div className="form-group">
                <label>Confirmar Nueva Contraseña</label>
                <input type="password" name="passwordConfirmar" value={form.passwordConfirmar} onChange={handleInputChange} className="input-glass" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="perfil-actions-center row-actions">
        <button className="btn-save" onClick={guardarCambios}>Guardar Cambios</button>
        <button className="btn-cancel" onClick={cancelarEdicion}>Cancelar</button>
      </div>

      {mostrarModalAvatar && (
        <div className="modal-overlay" onClick={() => setMostrarModalAvatar(false)}>
          <div className="modal-avatar" onClick={e => e.stopPropagation()}>
            <h3>Selecciona tu Avatar</h3>
            <div className="avatar-grid">
              {AVATARES.map((avatar, idx) => (
                <div 
                  key={idx} 
                  className={`avatar-option ${form.avatar_url === avatar ? 'selected' : ''}`}
                  onClick={() => handleSeleccionarAvatar(avatar)}
                >
                  <img src={avatar} alt={`Avatar ${idx + 1}`} />
                </div>
              ))}
            </div>
            <button className="btn-cancelar-modal" onClick={() => setMostrarModalAvatar(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout hideSearch={true}>
      <div className="perfil-container">
        {isEditing ? renderEditMode() : renderViewMode()}
      </div>
    </DashboardLayout>
  );
}
