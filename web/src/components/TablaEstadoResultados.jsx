import { formatChartValue } from "./chartFormatters";
import "./estilos/TablaEstadoResultados.css";

export default function TablaEstadoResultados({ datos }) {
  return (
    <div className="tabla-wrapper">
      <table className="tabla-estado-resultados">
        <thead>
          <tr>
            <th>Año</th>
            <th>Revenue</th>
            <th>Cost</th>
            <th>Gross Profit</th>
            <th>Operating Income</th>
            <th>Net Income</th>
          </tr>
        </thead>

        <tbody>
          {datos.map((d, idx) => (
            <tr key={d.fecha} className={idx % 2 === 0 ? "even" : "odd"}>
              <td className="cell-year">{d.fecha}</td>
              <td className="cell-number">{formatChartValue(d.revenue)}</td>
              <td className="cell-number">{formatChartValue(d.cost)}</td>
              <td className="cell-number positive">{formatChartValue(d.grossProfit)}</td>
              <td className="cell-number positive">{formatChartValue(d.operatingIncome)}</td>
              <td className="cell-number">{formatChartValue(d.netIncome)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}