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
import { formatChartValue, formatYAxis } from "./chartFormatters";
import "./estilos/GraficaEBITDA.css";

export default function GraficaEBITDA({ datos }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={datos}>
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

        <Line
          dataKey="ebit"
          name="EBIT"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: '#3b82f6', r: 5 }}
          activeDot={{ r: 7 }}
          className="line-ebit"
        />

        <Line
          dataKey="ebitda"
          name="EBITDA"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: '#8b5cf6', r: 5 }}
          activeDot={{ r: 7 }}
          className="line-ebitda"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}