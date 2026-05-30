import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { formatChartValue, formatYAxis } from "./chartFormatters";
import "./estilos/GraficaGastosOperativos.css";

export default function GraficaGastosOperativos({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)"/>

        <XAxis dataKey="fecha" stroke="#94a3b8"/>
        <YAxis stroke="#94a3b8" tickFormatter={formatYAxis}/>
        <Tooltip 
          formatter={(value) => formatChartValue(value)}
          contentStyle={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(71, 85, 105, 0.5)',
            borderRadius: '8px'
          }}
        />
        <Legend />

        <Bar
          stackId="gastos"
          dataKey="sga"
          name="Administración"
          fill="#8b5cf6"
          radius={[8, 8, 0, 0]}
          className="bar-sga"
        />

        <Bar
          stackId="gastos"
          dataKey="rnd"
          name="Investigación"
          fill="#06b6d4"
          radius={[8, 8, 0, 0]}
          className="bar-rnd"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}