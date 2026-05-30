import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

import TarjetaMetrica from "../components/TarjetaMetrica";
import GraficaIngresosVsCostos from "../components/GraficaIngresosVsCostos";
import GraficaGastosOperativos from "../components/GraficaGastosOperativos";
import GraficaUtilidad from "../components/GraficaUtilidad";
import GraficaMargenes from "../components/GraficaMargenes";
import GraficaEBITDA from "../components/GraficaEBITDA";
import TablaEstadoResultados from "../components/TablaEstadoResultados";
import "./estilo/Empresa.css";

export default function Empresa() {

  const { simbolo } = useParams();

  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {

    api
      .get(`/api/financiero/${simbolo}`)
      .then((res) => setEmpresa(res.data));

  }, [simbolo]);

  if (!empresa) return <h2>Cargando...</h2>;

  const datos = empresa.annualReports
    .slice(0, 10)
    .reverse()
    .map((r) => ({

      fecha: r.fiscalDateEnding.substring(0, 4),

      revenue: Number(r.totalRevenue),

      cost: Number(r.costOfRevenue),

      grossProfit: Number(r.grossProfit),

      operatingIncome: Number(r.operatingIncome),

      operatingExpenses: Number(r.operatingExpenses),

      sga: Number(r.sellingGeneralAndAdministrative),

      rnd: Number(r.researchAndDevelopment),

      netIncome: Number(r.netIncome),

      ebit: Number(r.ebit),

      ebitda: Number(r.ebitda),

      grossMargin:
        (Number(r.grossProfit) /
          Number(r.totalRevenue)) * 100,

      operatingMargin:
        (Number(r.operatingIncome) /
          Number(r.totalRevenue)) * 100,

      netMargin:
        (Number(r.netIncome) /
          Number(r.totalRevenue)) * 100
    }));

  const ultimo = datos[datos.length - 1];

  return (
    <div className="empresa-container">

      <h1>{empresa.symbol}</h1>

      <div className="kpis">

        <TarjetaMetrica
          titulo="Revenue"
          valor={ultimo.revenue}
          color="#10b981"
        />

        <TarjetaMetrica
          titulo="Gross Profit"
          valor={ultimo.grossProfit}
          color="#f59e0b"
        />

        <TarjetaMetrica
          titulo="Operating Income"
          valor={ultimo.operatingIncome}
          color="#3b82f6"
        />

        <TarjetaMetrica
          titulo="Operating Expenses"
          valor={ultimo.operatingExpenses}
          color="#06b6d4"
        />

        <TarjetaMetrica
          titulo="SGA (Admin)"
          valor={ultimo.sga}
          color="#8b5cf6"
        />

        <TarjetaMetrica
          titulo="R&D"
          valor={ultimo.rnd}
          color="#ec4899"
        />

        <TarjetaMetrica
          titulo="EBIT"
          valor={ultimo.ebit}
          color="#a78bfa"
        />

        <TarjetaMetrica
          titulo="Net Income"
          valor={ultimo.netIncome}
          color="#14b8a6"
        />

        <TarjetaMetrica
          titulo="EBITDA"
          valor={ultimo.ebitda}
          color="#8b5cf6"
        />

      </div>

      <div className="graficas-container">

        <div className="grafica-card">
          <h2>Ingresos vs Costos</h2>
          <GraficaIngresosVsCostos datos={datos}/>
        </div>

        <div className="grafica-card">
          <h2>Gastos Operativos</h2>
          <GraficaGastosOperativos datos={datos}/>
        </div>

        <div className="grafica-card">
          <h2>Utilidad Neta</h2>
          <GraficaUtilidad datos={datos}/>
        </div>

        <div className="grafica-card">
          <h2>Márgenes</h2>
          <GraficaMargenes datos={datos}/>
        </div>

        <div className="grafica-card">
          <h2>EBIT vs EBITDA</h2>
          <GraficaEBITDA datos={datos}/>
        </div>

        <div className="grafica-card tabla-container">
          <h2>Estado de Resultados</h2>
          <TablaEstadoResultados datos={datos}/>
        </div>

      </div>

    </div>
  );
}