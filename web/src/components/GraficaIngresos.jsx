import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { formatChartValue, formatYAxis } from './chartFormatters';
import "./estilos/GraficaIngresos.css";

export default function GraficaIngresos({ reportes }) {
  const datos = reportes.map(r => ({
    año:       r.fiscalDateEnding?.slice(0, 4),
    Ingresos:  parseFloat(r.totalRevenue)  / 1e9,
    Costos:    parseFloat(r.costOfRevenue) / 1e9,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)" />
        <XAxis dataKey="año" stroke="#94a3b8" />
        <YAxis tickFormatter={v => `$${v.toFixed(0)}B`} stroke="#94a3b8" />
        <Tooltip 
          formatter={v => `$${v.toFixed(2)}B`}
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Bar dataKey="Ingresos" fill="#10b981" radius={[8, 8, 0, 0]} className="bar-ingresos" />
        <Bar dataKey="Costos" fill="#ef4444" radius={[8, 8, 0, 0]} className="bar-costos" />
      </BarChart>
    </ResponsiveContainer>
  );
}