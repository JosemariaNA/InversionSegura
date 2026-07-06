import { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import api from '../api';
import './estilo/ControlFinanciero.css';

export default function ControlFinanciero() {
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [form, setForm] = useState({
    concepto: '',
    tipo: 'ingreso',
    monto: '',
    fecha: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    cargarTransacciones();
  }, []);

  const cargarTransacciones = async () => {
    try {
      const res = await api.get('/api/control');
      setTransacciones(res.data);
    } catch (err) {
      console.error('Error al cargar transacciones:', err);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.concepto || !form.monto || !form.fecha) return;

    try {
      const res = await api.post('/api/control', {
        concepto: form.concepto,
        tipo: form.tipo,
        monto: form.monto,
        fecha: form.fecha
      });
      // Añadir al principio de la lista
      setTransacciones([res.data, ...transacciones]);
      // Reset form (mantener tipo y fecha actual)
      setForm({ ...form, concepto: '', monto: '' });
    } catch (err) {
      console.error('Error al guardar la transacción:', err);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta operación?')) return;
    try {
      await api.delete(`/api/control/${id}`);
      setTransacciones(transacciones.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  // Cálculos
  const ingresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((acc, curr) => acc + Number(curr.monto), 0);
  const gastos = transacciones.filter(t => t.tipo === 'gasto').reduce((acc, curr) => acc + Number(curr.monto), 0);
  const balance = ingresos - gastos;

  const formatearMonto = (monto) => {
    return Number(monto).toFixed(2);
  };

  return (
    <DashboardLayout hideSearch={true}>
      <div className="control-container">
        {/* Encabezado */}
        <header className="control-header">
          <div className="header-titles">
            <span className="subtitle">SISTEMA</span>
            <h1 className="title-white">Control</h1>
            <h1 className="title-green">Financiero</h1>
          </div>
          <div className="header-illustration">
            <div className="illustration-wrapper">
              <BarChart2 size={64} />
            </div>
          </div>
        </header>

        {/* Formulario Nueva Operación */}
        <section className="control-section form-section">
          <h3 className="section-title">NUEVA OPERACIÓN</h3>
          <form className="operacion-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="concepto"
              className="control-input grid-full" 
              placeholder="Concepto" 
              value={form.concepto}
              onChange={handleChange}
              required
            />
            
            <div className="form-row">
              <select 
                name="tipo" 
                className="control-input select-tipo" 
                value={form.tipo}
                onChange={handleChange}
              >
                <option value="ingreso">↑ Ingreso</option>
                <option value="gasto">↓ Gasto</option>
              </select>

              <input 
                type="number" 
                name="monto"
                className="control-input" 
                placeholder="Monto (S/.)" 
                step="0.01"
                min="0.01"
                value={form.monto}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <input 
                type="date" 
                name="fecha"
                className="control-input" 
                value={form.fecha}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn-guardar">GUARDAR →</button>
            </div>
          </form>
        </section>

        {/* Historial */}
        <section className="control-section historial-section">
          <h3 className="section-title">HISTORIAL</h3>
          
          <div className="historial-table-container">
            <table className="historial-table">
              <thead>
                <tr>
                  <th>CONCEPTO</th>
                  <th>TIPO</th>
                  <th>MONTO</th>
                  <th>FECHA</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Cargando...</td></tr>
                ) : transacciones.length === 0 ? (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px', color: '#6b7280'}}>No hay transacciones registradas</td></tr>
                ) : (
                  transacciones.map(t => (
                    <tr key={t.id}>
                      <td className="td-concepto">{t.concepto}</td>
                      <td>
                        <span className={`badge-tipo ${t.tipo}`}>
                          {t.tipo === 'ingreso' ? '↑ Ingreso' : '↓ Gasto'}
                        </span>
                      </td>
                      <td className="td-monto">
                        S/. {formatearMonto(t.monto)}
                      </td>
                      <td className="td-fecha">{t.fecha}</td>
                      <td className="td-acciones">
                        <button className="btn-eliminar" onClick={() => handleEliminar(t.id)}>ELIMINAR</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Resumen Balance */}
        <section className="balance-grid">
          <div className="balance-card">
            <span className="balance-label label-ingresos">INGRESOS</span>
            <span className="balance-monto monto-ingresos">S/. {formatearMonto(ingresos)}</span>
          </div>
          <div className="balance-card">
            <span className="balance-label label-gastos">GASTOS</span>
            <span className="balance-monto monto-gastos">S/. {formatearMonto(gastos)}</span>
          </div>
          <div className="balance-card">
            <span className="balance-label label-balance">BALANCE</span>
            <span className="balance-monto monto-balance">S/. {formatearMonto(balance)}</span>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
