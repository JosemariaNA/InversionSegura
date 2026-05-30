import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [simbolo,   setSimbol]   = useState('');
  const [historial, setHistorial] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
  const nombre = localStorage.getItem('nombre');

  useEffect(() => {
    api.get('/api/financiero/usuario/historial').then(r => setHistorial(r.data));
    api.get('/api/favoritos').then(r => setFavoritos(r.data));
  }, []);

  const buscar = () => {
    if (simbolo.trim()) navigate(`/empresa/${simbolo.toUpperCase()}`);
  };

  return (
    <div className="dashboard">
      <h2>Bienvenido, {nombre} 👋</h2>

      <div className="buscador">
        <input
          placeholder="Buscar empresa: AAPL, MSFT, TSLA..."
          value={simbolo}
          onChange={e => setSimbol(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
        />
        <button onClick={buscar}>Analizar</button>
      </div>

      <div className="panel-doble">
        <div className="panel">
          <h3>🕘 Historial reciente</h3>
          {historial.length === 0 && <p>Sin búsquedas aún</p>}
          {historial.slice(0, 20).map((h, i) => (
            <div key={i} className="item-lista"
              onClick={() => navigate(`/empresa/${h.simbolo}`)}>
              <strong>{h.simbolo}</strong>
              <span>{new Date(h.buscado_en).toLocaleDateString()}</span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>⭐ Favoritos</h3>
          {favoritos.length === 0 && <p>Sin favoritos aún</p>}
          {favoritos.map((f, i) => (
            <div key={i} className="item-lista"
              onClick={() => navigate(`/empresa/${f.simbolo}`)}>
              <strong>{f.simbolo}</strong>
              <span>{f.nombre_empresa}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}