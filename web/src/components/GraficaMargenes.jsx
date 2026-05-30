import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import "./estilos/GraficaMargenes.css";

const formatPercentage = (value) => {
  if (value === null || value === undefined) return "0%";
  return value.toFixed(1) + "%";
};

export default function GraficaMargenes({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)"/>

        <XAxis dataKey="fecha" stroke="#94a3b8"/>
        <YAxis stroke="#94a3b8" tickFormatter={(v) => v.toFixed(0) + "%"}/>
        <Tooltip 
          formatter={(value) => formatPercentage(value)}
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            borderRadius: '8px'
          }}
        />
        <Legend />

        <Line
          dataKey="grossMargin"
          name="Margen Bruto %"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', r: 5 }}
          activeDot={{ r: 7 }}
          className="line-gross"
        />

        <Line
          dataKey="operatingMargin"
          name="Margen Operativo %"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ fill: '#f59e0b', r: 5 }}
          activeDot={{ r: 7 }}
          className="line-operating"
        />

        <Line
          dataKey="netMargin"
          name="Margen Neto %"
          stroke="#06b6d4"
          strokeWidth={3}
          dot={{ fill: '#06b6d4', r: 5 }}
          activeDot={{ r: 7 }}
          className="line-net"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}