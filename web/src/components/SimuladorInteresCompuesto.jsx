import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator } from 'lucide-react';

export default function SimuladorInteresCompuesto() {
  const [inicial, setInicial] = useState(1000);
  const [mensual, setMensual] = useState(100);
  const [tasa, setTasa] = useState(10);
  const [anios, setAnios] = useState(10);

  const datosSimulacion = useMemo(() => {
    const data = [];
    let capitalTotal = Number(inicial);
    let totalAportado = Number(inicial);

    data.push({
      anio: 0,
      Total: capitalTotal,
      Aportaciones: totalAportado,
      Intereses: 0
    });

    for (let i = 1; i <= anios; i++) {
      let capitalAnio = capitalTotal;
      for (let mes = 0; mes < 12; mes++) {
        capitalAnio = capitalAnio * (1 + (tasa / 100) / 12) + Number(mensual);
      }
      
      capitalTotal = capitalAnio;
      totalAportado += Number(mensual) * 12;

      data.push({
        anio: i,
        Total: Math.round(capitalTotal),
        Aportaciones: Math.round(totalAportado),
        Intereses: Math.round(capitalTotal - totalAportado)
      });
    }

    return data;
  }, [inicial, mensual, tasa, anios]);

  const formatoMoneda = (valor) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(valor);
  };

  return (
    <div className="simulador-container panel" style={{ marginTop: '20px', padding: '24px' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '1.25rem' }}>
        <Calculator size={24} color="#10b981" /> Simulador de Interés Compuesto
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Inversión Inicial ($)</label>
          <input 
            type="number" 
            value={inicial} 
            onChange={(e) => setInicial(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Aportación Mensual ($)</label>
          <input 
            type="number" 
            value={mensual} 
            onChange={(e) => setMensual(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Tasa de Interés Anual (%)</label>
          <input 
            type="number" 
            value={tasa} 
            onChange={(e) => setTasa(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#9ca3af', fontSize: '0.875rem' }}>Años a Invertir</label>
          <input 
            type="number" 
            value={anios} 
            onChange={(e) => setAnios(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#374151', border: '1px solid #4b5563', color: 'white' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '4px' }}>Balance Final Estimado</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{formatoMoneda(datosSimulacion[datosSimulacion.length - 1].Total)}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '4px' }}>Total Aportado</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#60a5fa' }}>{formatoMoneda(datosSimulacion[datosSimulacion.length - 1].Aportaciones)}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '4px' }}>Intereses Ganados</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{formatoMoneda(datosSimulacion[datosSimulacion.length - 1].Intereses)}</p>
        </div>
      </div>

      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <AreaChart data={datosSimulacion} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAportado" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorIntereses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="anio" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(val) => `Año ${val}`} />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickFormatter={(val) => `$${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: 'white', borderRadius: '8px' }}
              itemStyle={{ color: 'white' }}
              formatter={(value) => formatoMoneda(value)}
              labelFormatter={(label) => `Año ${label}`}
            />
            <Legend verticalAlign="top" height={36}/>
            <Area type="monotone" dataKey="Aportaciones" stackId="1" stroke="#60a5fa" fill="url(#colorAportado)" />
            <Area type="monotone" dataKey="Intereses" stackId="1" stroke="#f59e0b" fill="url(#colorIntereses)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
