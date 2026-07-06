import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import api from '../api';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const [historial, setHistorial] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/financiero/usuario/historial')
      .then(r => setHistorial(r.data))
      .catch(err => {
        console.error('Error cargando historial:', err);
        setHistorial([]);
      });
    api.get('/api/favoritos')
      .then(r => setFavoritos(r.data))
      .catch(err => {
        console.error('Error cargando favoritos:', err);
        setFavoritos([]);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="panel-doble">
        <div className="panel">
          <h3><Clock size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Historial reciente</h3>
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
          <h3><Star size={20} style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Favoritos</h3>
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
      
      <div className="vistazo-financiero">
         {/* Espacio para los widgets del vistazo financiero si existieran, se asume que están abajo */}
      </div>
    </DashboardLayout>
  );
}