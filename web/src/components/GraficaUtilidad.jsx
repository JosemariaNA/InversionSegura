import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function GraficaUtilidad({ reportes }) {
  const datos = reportes.map(r => ({
    año:             r.fiscalDateEnding?.slice(0, 4),
    'Utilidad Bruta': parseFloat(r.grossProfit) / 1e9,
    'Utilidad Neta':  parseFloat(r.netIncome)   / 1e9,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="año" />
        <YAxis tickFormatter={v => `$${v}B`} />
        <Tooltip formatter={v => `$${v.toFixed(2)}B`} />
        <Legend />
        <Line type="monotone" dataKey="Utilidad Bruta" stroke="#10b981" strokeWidth={2} dot={{ r: 5 }} />
        <Line type="monotone" dataKey="Utilidad Neta"  stroke="#8b5cf6" strokeWidth={2} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}