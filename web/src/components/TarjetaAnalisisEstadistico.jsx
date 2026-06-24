import { useState, useMemo } from "react";
import "./estilos/TarjetaAnalisisEstadistico.css";
import ModalAnalisisCompleto from "./ModalAnalisisCompleto";

// ============================================================
// Funciones de cálculo estadístico - Prueba t de Student
// ============================================================

const calcularMedia = (datos) => {
  if (datos.length === 0) return 0;
  return datos.reduce((a, b) => a + b, 0) / datos.length;
};

const calcularDesviacionEstandar = (datos) => {
  if (datos.length < 2) return 0;
  const media = calcularMedia(datos);
  const varianza = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / (datos.length - 1);
  return Math.sqrt(varianza);
};

const calcularTStatistic = (datos) => {
  if (datos.length < 2) return null;
  const media = calcularMedia(datos);
  const desviacion = calcularDesviacionEstandar(datos);
  if (desviacion === 0) return null;
  const n = datos.length;
  const t = (media - 0) / (desviacion / Math.sqrt(n));
  return t;
};

// Tabla de valores críticos de t para una cola (α = 0.05)
const getValorCriticoT = (df) => {
  const tablaTCritica = {
    1: 6.314, 2: 2.920, 3: 2.353, 4: 2.132, 5: 2.015,
    6: 1.943, 7: 1.895, 8: 1.860, 9: 1.833, 10: 1.812,
    11: 1.796, 12: 1.782, 13: 1.771, 14: 1.761, 15: 1.753,
    20: 1.725, 25: 1.708, 30: 1.697, 40: 1.684, 50: 1.676,
    60: 1.671, 80: 1.664, 100: 1.660, Infinity: 1.645
  };
  
  if (tablaTCritica[df]) return tablaTCritica[df];
  
  // Interpolación para df no tabulados
  const dfArr = Object.keys(tablaTCritica).map(Number).filter(d => d !== Infinity);
  const menorDF = dfArr.filter(d => d <= df).pop() || dfArr[0];
  const mayorDF = dfArr.find(d => d > df) || Infinity;
  
  if (mayorDF === Infinity) return tablaTCritica[menorDF];
  
  const t1 = tablaTCritica[menorDF];
  const t2 = tablaTCritica[mayorDF];
  return t1 + (t2 - t1) * ((df - menorDF) / (mayorDF - menorDF));
};

// ============================================================
// Logaritmo de la función gamma (Lanczos approximation)
// ============================================================
const logGamma = (x) => {
  if (x <= 0) return Infinity;
  if (x < 0.5) {
    // Fórmula de reflexión: Γ(x)Γ(1-x) = π/sin(πx)
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  
  // Aproximación de Lanczos (g=7, n=8 coeficientes)
  const cof = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  x -= 1;
  const a = 0.99999999999980993;
  let y = a;
  
  for (let i = 0; i < cof.length; i++) {
    y += cof[i] / (x + i + 1);
  }
  
  const t = x + cof.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(y);
};

// Logaritmo de la función beta
const logBeta = (a, b) => {
  return logGamma(a) + logGamma(b) - logGamma(a + b);
};

// ============================================================
// Beta incompleta regularizada - Algoritmo de Lentz (CORREGIDO)
// ============================================================
const betaIncompleta = (x, a, b) => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  
  // Propiedad de simetría: I_x(a,b) = 1 - I_(1-x)(b,a)
  // Usar cuando x > (a+1)/(a+b+2) para mejor convergencia
  if (x > (a + 1) / (a + b + 2)) {
    return 1.0 - betaIncompleta(1.0 - x, b, a);
  }
  
  const ITMAX = 200;
  const EPS = 3.0e-12;
  const FPMIN = 1.0e-30;
  
  // Prefactor: x^a * (1-x)^b / (a * B(a,b))
  const lnPrefactor = a * Math.log(x) + b * Math.log(1 - x) - logBeta(a, b) - Math.log(a);
  const front = Math.exp(lnPrefactor);
  
  // Evaluación de la fracción continua con el método de Lentz modificado
  // La fracción continua para I_x(a,b) es:
  // 1/(1+ d1/(1+ d2/(1+ ...)))
  // donde d_{2m+1} = -(a+m)(a+b+m)x / ((a+2m)(a+2m+1))
  //       d_{2m}   = m(b-m)x / ((a+2m-1)(a+2m))
  
  let f = 1.0;
  let c = 1.0;
  let d = 1.0;
  
  for (let i = 1; i <= ITMAX; i++) {
    const m = Math.floor(i / 2);
    let numerador;
    
    if (i % 2 === 0) {
      // Término par: d_{2m} = m(b-m)x / ((a+2m-1)(a+2m))
      numerador = (m * (b - m) * x) / ((a + 2.0 * m - 1.0) * (a + 2.0 * m));
    } else {
      // Término impar: d_{2m+1} = -((a+m)(a+b+m)x) / ((a+2m)(a+2m+1))
      numerador = -((a + m) * (a + b + m) * x) / ((a + 2.0 * m) * (a + 2.0 * m + 1.0));
    }
    
    // Método de Lentz modificado
    d = 1.0 + numerador * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1.0 / d;
    
    c = 1.0 + numerador / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    
    const delta = c * d;
    f *= delta;
    
    // Convergencia cuando delta ≈ 1
    if (Math.abs(delta - 1.0) < EPS) break;
  }
  
  return Math.min(1.0, Math.max(0.0, front * a * f));
};

// ============================================================
// CDF de la distribución t de Student (CORREGIDO)
// ============================================================
const calcularTCDF = (t, df) => {
  // CDF_t(t, df) = P(T <= t) donde T ~ t(df)
  // Usando la relación con la beta incompleta regularizada:
  // Para t >= 0: CDF(t) = 1 - 0.5 * I_x(df/2, 1/2) donde x = df/(df+t²)
  // Para t < 0:  CDF(t) = 0.5 * I_x(df/2, 1/2)
  
  if (df <= 0) return t >= 0 ? 1 : 0;
  
  const x = df / (df + t * t);
  const ibeta = betaIncompleta(x, df / 2.0, 0.5);
  
  if (t >= 0) {
    return 1.0 - 0.5 * ibeta;
  } else {
    return 0.5 * ibeta;
  }
};

// ============================================================
// P-value para prueba unilateral derecha (CORREGIDO)
// H₀: μ ≤ 0  vs  H₁: μ > 0
// p-value = P(T > t_obs) = 1 - CDF(t_obs)
// ============================================================
const calcularPvalueExacto = (t, n) => {
  const df = n - 1;
  // Cola derecha: P(T > t) = 1 - CDF(t)
  const pValue = 1.0 - calcularTCDF(t, df);
  return Math.min(1.0, Math.max(0.0, pValue));
};

export default function TarjetaAnalisisEstadistico({ datos }) {
  const [showModal, setShowModal] = useState(false);

  const analisis = useMemo(() => {
    // Bug #6 corregido: Filtro que NO excluye valores cero ni pequeños
    // Solo excluir null, undefined y NaN
    const netIncomes = datos
      .map((d, idx) => ({
        valor: d.netIncome,
        año: d.fecha,
        idx
      }))
      .filter(item => item.valor !== null && item.valor !== undefined && !isNaN(item.valor));

    if (netIncomes.length < 2) {
      return {
        error: true,
        mensaje: "Datos insuficientes para análisis estadístico (se necesitan al menos 2 observaciones)",
        datosUsados: 0
      };
    }

    // Extraer solo los valores para cálculos
    const netIncomeValues = netIncomes.map(item => item.valor);
    
    const media = calcularMedia(netIncomeValues);
    const desviacion = calcularDesviacionEstandar(netIncomeValues);
    const n = netIncomeValues.length;
    const gl = n - 1; // Grados de libertad
    const tStatistic = calcularTStatistic(netIncomeValues);
    
    // Si desviación es 0 o t no se puede calcular
    if (tStatistic === null || desviacion === 0) {
      return {
        error: true,
        mensaje: "No se puede realizar la prueba: desviación estándar es cero (todos los valores son iguales)",
        datosUsados: netIncomes.length
      };
    }
    
    const valorCritico = getValorCriticoT(gl);
    const pValue = calcularPvalueExacto(tStatistic, n);
    
    // Bug #3 corregido: Decisión SOLO basada en p-value (sin condición redundante de media > 0)
    const rechazaH0 = pValue < 0.05;
    const esRentable = rechazaH0;
    
    // Bug #4 corregido: Validación de consistencia entre p-value y t vs t-crítico
    const rechazaPorT = tStatistic > valorCritico;
    const rechazaPorP = pValue < 0.05;
    const consistente = rechazaPorT === rechazaPorP;
    
    // Bug #5: Advertencia cuando n < 5
    const advertenciaDatos = n < 5;

    return {
      error: false,
      media,
      desviacion,
      n,
      gl,
      tStatistic,
      valorCritico,
      pValue,
      rechazaH0,
      rechazaPorT,
      rechazaPorP,
      consistente,
      esRentable,
      datosUsados: netIncomes,
      nivelConfianza: 0.95,
      nivelSignificancia: 0.05,
      advertenciaDatos
    };
  }, [datos]);

  const formatearValor = (n) => {
    if (n === null || n === undefined) return "N/A";
    const absN = Math.abs(n);
    
    if (absN >= 1e9) {
      return (n / 1e9).toFixed(2) + "B";
    } else if (absN >= 1e6) {
      return (n / 1e6).toFixed(2) + "M";
    } else if (absN >= 1e3) {
      return (n / 1e3).toFixed(2) + "K";
    }
    return n.toFixed(2);
  };

  if (analisis.error) {
    return (
      <div className="tarjeta-analisis-estadistico error">
        <div className="color-indicator-error"></div>
        <h4>Análisis Estadístico</h4>
        <p className="error-message">{analisis.mensaje}</p>
      </div>
    );
  }

  return (
    <>
      <div className="tarjeta-analisis-estadistico">
        <div className={`color-indicator ${analisis.esRentable ? 'rentable' : 'no-rentable'}`}></div>
        
        <h4>Rentabilidad Estadística</h4>
        
        <div className="estado-rentabilidad">
          <div className={`badge ${analisis.esRentable ? 'rentable' : 'no-rentable'}`}>
            {analisis.esRentable ? '🟢 Rentable' : '🔴 No Rentable'}
          </div>
        </div>

        {/* Advertencia de datos insuficientes */}
        {analisis.advertenciaDatos && (
          <div className="advertencia-datos">
            ⚠️ Muestra pequeña (n={analisis.n}). Los resultados pueden no ser confiables.
          </div>
        )}

        {/* Error de consistencia */}
        {!analisis.consistente && (
          <div className="error-consistencia">
            ⚠️ Inconsistencia detectada entre criterios de decisión.
          </div>
        )}

        <div className="indicadores-resumidos">
          <div className="indicador">
            <span className="label">Utilidad Promedio</span>
            <span className="valor">{formatearValor(analisis.media)}</span>
          </div>
          <div className="indicador">
            <span className="label">p-value</span>
            <span className="valor">{analisis.pValue.toFixed(4)}</span>
          </div>
          <div className="indicador">
            <span className="label">g.l.</span>
            <span className="valor">{analisis.gl}</span>
          </div>
        </div>

        <button 
          className="btn-ver-analisis"
          onClick={() => setShowModal(true)}
        >
          Ver Análisis Completo
        </button>
      </div>

      {showModal && (
        <ModalAnalisisCompleto 
          analisis={analisis} 
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
