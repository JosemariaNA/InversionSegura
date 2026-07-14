import { useState } from 'react';
import { Scale, Loader2, TriangleAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';

export default function ComparadorActivos() {
  const [simbolo1, setSimbolo1] = useState('AAPL');
  const [simbolo2, setSimbolo2] = useState('MSFT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [datos1, setDatos1] = useState(null);
  const [datos2, setDatos2] = useState(null);

  const formatoMoneda = (valor) => {
    if (!valor) return '$0';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(valor);
  };

  const handleComparar = async () => {
    if (!simbolo1.trim() || !simbolo2.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const [res1, res2] = await Promise.all([
        api.get(`/api/financiero/${simbolo1.toUpperCase()}`),
        api.get(`/api/financiero/${simbolo2.toUpperCase()}`)
      ]);

      if (!res1.data.annualReports || res1.data.annualReports.length === 0 || !res2.data.annualReports || res2.data.annualReports.length === 0) {
        throw new Error('No se encontraron datos para uno o ambos símbolos.');
      }

      setDatos1(res1.data);
      setDatos2(res2.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener datos comparativos. Verifica que los símbolos sean correctos.');
      setDatos1(null);
      setDatos2(null);
    } finally {
      setLoading(false);
    }
  };

  // Preparar datos para gráficos si existen
  let chartData = [];
  let ultimo1 = null;
  let ultimo2 = null;

  if (datos1 && datos2) {
    ultimo1 = datos1.annualReports[0];
    ultimo2 = datos2.annualReports[0];

    chartData = [
      {
        name: 'Revenue',
        [datos1.symbol]: Number(ultimo1.totalRevenue),
        [datos2.symbol]: Number(ultimo2.totalRevenue),
      },
      {
        name: 'Gross Profit',
        [datos1.symbol]: Number(ultimo1.grossProfit),
        [datos2.symbol]: Number(ultimo2.grossProfit),
      },
      {
        name: 'Operating Inc.',
        [datos1.symbol]: Number(ultimo1.operatingIncome),
        [datos2.symbol]: Number(ultimo2.operatingIncome),
      },
      {
        name: 'Net Income',
        [datos1.symbol]: Number(ultimo1.netIncome),
        [datos2.symbol]: Number(ultimo2.netIncome),
      }
    ];
  }

  return (
    <div className="comparador-container panel" style={{ marginTop: '20px', padding: '24px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.25rem' }}>
        <Scale size={24} color="#3b82f6" /> Comparador de Activos
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Empresa A (Símbolo)</label>
          <input 
            type="text" 
            value={simbolo1} 
            onChange={(e) => setSimbolo1(e.target.value.toUpperCase())}
            placeholder="Ej. AAPL"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', textTransform: 'uppercase' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '10px', color: '#9ca3af', fontWeight: 'bold' }}>
          VS
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Empresa B (Símbolo)</label>
          <input 
            type="text" 
            value={simbolo2} 
            onChange={(e) => setSimbolo2(e.target.value.toUpperCase())}
            placeholder="Ej. MSFT"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white', textTransform: 'uppercase' }}
          />
        </div>
        
        <div>
          <button 
            onClick={handleComparar}
            disabled={loading}
            style={{ padding: '10px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {loading ? <><Loader2 size={18} className="spin" /> Comparando...</> : 'Comparar'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', color: '#ef4444', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TriangleAlert size={20} /> {error}
        </div>
      )}

      {datos1 && datos2 && ultimo1 && ultimo2 && (
        <div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {/* Tabla Comparativa */}
            <div style={{ flex: '1 1 300px', backgroundColor: '#1f2937', borderRadius: '8px', padding: '16px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    <th style={{ padding: '12px', color: '#9ca3af' }}>Métrica (Último Año)</th>
                    <th style={{ padding: '12px', color: '#60a5fa' }}>{datos1.symbol}</th>
                    <th style={{ padding: '12px', color: '#10b981' }}>{datos2.symbol}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>Revenue</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo1.totalRevenue)}</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo2.totalRevenue)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>Gross Profit</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo1.grossProfit)}</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo2.grossProfit)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>Operating Income</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo1.operatingIncome)}</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo2.operatingIncome)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>Net Income</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo1.netIncome)}</td>
                    <td style={{ padding: '12px' }}>{formatoMoneda(ultimo2.netIncome)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Gráfico Comparativo */}
            <div style={{ flex: '1 1 400px', height: 300, backgroundColor: '#1f2937', borderRadius: '8px', padding: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(val) => `$${val/1000000000}B`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#374151', borderColor: '#4b5563', color: 'white', borderRadius: '8px' }}
                    itemStyle={{ color: 'white' }}
                    formatter={(value) => formatoMoneda(value)}
                  />
                  <Legend />
                  <Bar dataKey={datos1.symbol} fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={datos2.symbol} fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
