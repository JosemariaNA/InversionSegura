import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function GraficaIngresos({ reportes }) {
  const datos = reportes.map(r => ({
    año:       r.fiscalDateEnding?.slice(0, 4),
    Ingresos:  parseFloat(r.totalRevenue)  / 1e9,
    Costos:    parseFloat(r.costOfRevenue) / 1e9,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="año" />
        <YAxis tickFormatter={v => `$${v}B`} />
        <Tooltip formatter={v => `$${v.toFixed(2)}B`} />
        <Legend />
        <Bar dataKey="Ingresos" fill="#3b82f6" radius={[4,4,0,0]} />
        <Bar dataKey="Costos"   fill="#ef4444" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}