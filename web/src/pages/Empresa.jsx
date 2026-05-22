import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import GraficaIngresos  from '../components/GraficaIngresos';
import GraficaUtilidad  from '../components/GraficaUtilidad';
import TarjetaMetrica   from '../components/TarjetaMetrica';

export default function Empresa() {
  const { simbolo } = useParams();
  const [datos,     setDatos]     = useState(null);
  const [cargando,  setCargando]  = useState(true);
  const [esFav,     setEsFav]     = useState(false);

  useEffect(() => {
    setCargando(true);
    api.get(`/api/financiero/${simbolo}`)
      .then(r => {
        const d = typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
        setDatos(d);
        setCargando(false);
      });

    api.get('/api/favoritos')
      .then(r => setEsFav(r.data.some(f => f.simbolo === simbolo)));
  }, [simbolo]);

  const toggleFavorito = async () => {
    if (esFav) {
      await api.delete(`/api/favoritos/${simbolo}`);
    } else {
      await api.post('/api/favoritos', { simbolo, nombre_empresa: simbolo });
    }
    setEsFav(!esFav);
  };

  if (cargando) return <div className="cargando">Cargando datos de {simbolo}...</div>;
  if (!datos?.annualReports) return <div className="error-msg">No se encontraron datos para {simbolo}</div>;

  // ✅ Filtra solo años desde 2020, toma los últimos 5, y los ordena del más antiguo al más reciente
  const reportes = datos.annualReports
    .filter(r => parseInt(r.fiscalDateEnding?.slice(0, 4)) >= 2020)
    .slice(0, 5)
    .reverse();

  const ultimo = datos.annualReports[0];

  const fmt = (n) => {
    const num = parseFloat(n);
    if (isNaN(num)) return 'N/A';
    if (Math.abs(num) >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (Math.abs(num) >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="empresa-page">
      <div className="empresa-header">
        <h2>{simbolo}</h2>
        <button className={`btn-fav ${esFav ? 'activo' : ''}`} onClick={toggleFavorito}>
          {esFav ? '⭐ En favoritos' : '☆ Agregar a favoritos'}
        </button>
      </div>

      {/* Tarjetas de métricas clave */}
      <div className="metricas-grid">
        <TarjetaMetrica titulo="Ingresos Totales"  valor={fmt(ultimo.totalRevenue)}       color="#3b82f6" />
        <TarjetaMetrica titulo="Utilidad Bruta"    valor={fmt(ultimo.grossProfit)}         color="#10b981" />
        <TarjetaMetrica titulo="Utilidad Neta"     valor={fmt(ultimo.netIncome)}           color="#8b5cf6" />
        <TarjetaMetrica titulo="EBITDA"            valor={fmt(ultimo.ebitda)}              color="#f59e0b" />
        <TarjetaMetrica titulo="Gastos Operativos" valor={fmt(ultimo.operatingExpenses)}   color="#ef4444" />
        <TarjetaMetrica titulo="Utilidad Operativa" valor={fmt(ultimo.operatingIncome)}    color="#06b6d4" />
      </div>

      {/* Gráficas */}
      <div className="graficas-grid">
        <div className="grafica-card">
          <h3>📈 Ingresos vs Costo de Ventas (5 años)</h3>
          <GraficaIngresos reportes={reportes} />
        </div>
        <div className="grafica-card">
          <h3>💰 Utilidad Bruta y Neta (5 años)</h3>
          <GraficaUtilidad reportes={reportes} />
        </div>
      </div>
    </div>
  );
}