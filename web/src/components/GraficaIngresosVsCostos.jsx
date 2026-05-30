import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { formatChartValue, formatYAxis } from "./chartFormatters";
import "./estilos/GraficaIngresosVsCostos.css";

export default function GraficaIngresosVsCostos({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={datos}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)" />
        <XAxis dataKey="fecha" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" tickFormatter={formatYAxis} />
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
          dataKey="revenue"
          name="Ingresos"
          fill="#10b981"
          radius={[8, 8, 0, 0]}
          className="bar-revenue"
        />

        <Bar
          dataKey="cost"
          name="Costos"
          fill="#ef4444"
          radius={[8, 8, 0, 0]}
          className="bar-cost"
        />

        <Bar
          dataKey="grossProfit"
          name="Ganancia Bruta"
          fill="#f59e0b"
          radius={[8, 8, 0, 0]}
          className="bar-profit"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}