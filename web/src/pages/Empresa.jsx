import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

import TarjetaMetrica from "../components/TarjetaMetrica";
import TarjetaAnalisisEstadistico from "../components/TarjetaAnalisisEstadistico";
import GraficaIngresosVsCostos from "../components/GraficaIngresosVsCostos";
import GraficaGastosOperativos from "../components/GraficaGastosOperativos";
import GraficaUtilidad from "../components/GraficaUtilidad";
import GraficaMargenes from "../components/GraficaMargenes";
import GraficaEBITDA from "../components/GraficaEBITDA";
import TablaEstadoResultados from "../components/TablaEstadoResultados";
import LoadingSpinner from "../components/LoadingSpinner";
import "./estilo/Empresa.css";

export default function Empresa() {

  const { simbolo } = useParams();
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    api
      .get(`/api/financiero/${simbolo}`)
      .then((res) => {
        // Validar que los datos tengan la estructura esperada
        if (!res.data || !res.data.annualReports) {
          throw new Error('Ticker no encontrado o no existe');
        }
        setEmpresa(res.data);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || err.message || 'Error al obtener datos del ticker';
        setError(errorMsg);
      });

    api
      .get('/api/favoritos')
      .then((res) => {
        const esFavorito = res.data.some(f => f.simbolo === simbolo.toUpperCase());
        setIsFavorite(esFavorito);
      })
      .catch(() => setIsFavorite(false));

  }, [simbolo, navigate]);

  const handleAddFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/api/favoritos/${empresa.symbol}`);
      } else {
        await api.post('/api/favoritos', {
          simbolo: empresa.symbol,
          nombre_empresa: empresa.longName || empresa.symbol
        });
      }
      setIsFavorite(!isFavorite);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    } catch (err) {
      console.error('Error al guardar favorito:', err);
    }
  };

  if (error) {
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)', maxWidth: '400px', animation: 'slideIn 0.3s ease-out' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#1f2937', marginBottom: '12px', fontSize: '20px' }}>Ticker No Encontrado</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>{error}</p>
          <button onClick={() => navigate('/')} style={{ backgroundColor: '#ef4444', color: 'white', padding: '10px 32px', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'} onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}>
            Aceptar
          </button>
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!empresa) return <LoadingSpinner />;

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

      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#10b981",
            color: "white",
            padding: "20px 40px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.4)",
            zIndex: 9999,
            animation: "fadeInOut 2s ease-in-out"
          }}
        >
          {isFavorite ? "✅ Agregado a Favoritos" : "❌ Removido de Favoritos"}
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>{empresa.symbol}</h1>
        <button
          onClick={handleAddFavorite}
          style={{
            padding: "10px 20px",
            backgroundColor: isFavorite ? "#059669" : "#10b981",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            color: "#ffffff",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#059669";
            e.target.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isFavorite ? "#059669" : "#10b981";
            e.target.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
          }}
        >
          {isFavorite ? "⭐ Quitar de Favoritos" : "⭐ Agregar a Favoritos"}
        </button>
      </div>

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

        <TarjetaAnalisisEstadistico datos={datos} />

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