import { useState } from "react";
import { X, TriangleAlert, CircleAlert, BarChart2, DollarSign, Target, TrendingUp, Calculator, Scale, Check, FileText, Info } from 'lucide-react';
import "./estilos/ModalAnalisisCompleto.css";

export default function ModalAnalisisCompleto({ analisis, onClose }) {
  const [expanded, setExpanded] = useState({
    hipotesis: true,
    datos: true,
    formula: false,
    resultados: true,
    decision: true,
    interpretacion: true
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const generarInterpretacion = () => {
    const { media, pValue, tStatistic, valorCritico, nivelConfianza, rechazaH0, n } = analisis;
    
    if (rechazaH0) {
      return `Con un nivel de confianza del ${(nivelConfianza * 100).toFixed(0)}%, la utilidad neta promedio de la empresa (${formatearValor(media)}) es significativamente mayor que cero. El p-value de ${pValue.toFixed(6)} es inferior al nivel de significancia de 0.05, y el estadístico t (${tStatistic.toFixed(4)}) supera el valor crítico (${valorCritico.toFixed(4)}). Por lo tanto, se rechaza la hipótesis nula y se concluye que la empresa ha sido rentable durante el período analizado (${n} años).`;
    } else {
      return `Con un nivel de confianza del ${(nivelConfianza * 100).toFixed(0)}%, no existe evidencia estadística suficiente para afirmar que la utilidad neta promedio de la empresa (${formatearValor(media)}) es significativamente mayor que cero. El p-value de ${pValue.toFixed(6)} es mayor o igual al nivel de significancia de 0.05. No se rechaza la hipótesis nula. Por lo tanto, no podemos concluir de manera estadísticamente significativa que la empresa ha sido rentable durante el período analizado (${n} años).`;
    }
  };

  const generarAñosConValores = () => {
    return analisis.datosUsados.map((item) => ({
      year: item.año,
      valor: formatearValor(item.valor)
    }));
  };

  const añosConValores = generarAñosConValores();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Análisis Estadístico Completo</h2>
          <button className="btn-cerrar" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="modal-body">

          {/* Advertencia de datos insuficientes */}
          {analisis.advertenciaDatos && (
            <div className="banner-advertencia">
              <span className="banner-icon"><TriangleAlert size={24} color="#f59e0b" /></span>
              <div>
                <strong>Muestra pequeña (n = {analisis.n})</strong>
                <p>Con menos de 5 observaciones, la inferencia estadística puede no ser confiable. Los resultados deben interpretarse con precaución.</p>
              </div>
            </div>
          )}

          {/* Error de consistencia */}
          {!analisis.consistente && (
            <div className="banner-error-consistencia">
              <span className="banner-icon"><CircleAlert size={24} color="#ef4444" /></span>
              <div>
                <strong>Inconsistencia detectada</strong>
                <p>La decisión por p-value ({analisis.rechazaPorP ? 'rechaza' : 'no rechaza'} H₀) difiere de la decisión por t vs t-crítico ({analisis.rechazaPorT ? 'rechaza' : 'no rechaza'} H₀). Esto puede deberse a limitaciones en la precisión numérica del cálculo.</p>
              </div>
            </div>
          )}

          {/* Prueba utilizada */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('prueba')}
            >
              <span><BarChart2 size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Prueba Utilizada</span>
              <span className="toggle-icon">{expanded.prueba ? '−' : '+'}</span>
            </button>
            {expanded.prueba && (
              <div className="accordion-content">
                <p>Prueba t de Student para una muestra</p>
              </div>
            )}
          </section>

          {/* Variable analizada */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('variable')}
            >
              <span><DollarSign size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Variable Analizada</span>
              <span className="toggle-icon">{expanded.variable ? '−' : '+'}</span>
            </button>
            {expanded.variable && (
              <div className="accordion-content">
                <p><strong>Net Income (Utilidad Neta)</strong></p>
                <p className="description">La ganancia neta es el resultado final después de deducir todos los gastos, impuestos e intereses del total de ingresos.</p>
              </div>
            )}
          </section>

          {/* Hipótesis */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('hipotesis')}
            >
              <span><Target size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Hipótesis</span>
              <span className="toggle-icon">{expanded.hipotesis ? '−' : '+'}</span>
            </button>
            {expanded.hipotesis && (
              <div className="accordion-content">
                <div className="hipotesis-box h0">
                  <h4>H₀ (Hipótesis Nula)</h4>
                  <p className="formula">μ ≤ 0</p>
                  <p className="description">La utilidad neta promedio de la empresa no es positiva, por lo que la empresa <strong>no es rentable</strong>.</p>
                </div>
                <div className="hipotesis-box h1">
                  <h4>H₁ (Hipótesis Alternativa)</h4>
                  <p className="formula">μ &gt; 0</p>
                  <p className="description">La utilidad neta promedio de la empresa es positiva, por lo que la empresa <strong>es rentable</strong>.</p>
                </div>
                <div className="info-box">
                  <p><strong>Prueba unilateral a la derecha:</strong> Nos interesa saber si la utilidad es significativamente mayor que cero.</p>
                </div>
              </div>
            )}
          </section>

          {/* Datos utilizados */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('datos')}
            >
              <span><TrendingUp size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Datos Históricos Utilizados</span>
              <span className="toggle-icon">{expanded.datos ? '−' : '+'}</span>
            </button>
            {expanded.datos && (
              <div className="accordion-content">
                <div className="datos-tabla">
                  <table>
                    <thead>
                      <tr>
                        <th>Año</th>
                        <th>Utilidad Neta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {añosConValores.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.year}</td>
                          <td className={item.valor.includes('-') ? 'negative' : 'positive'}>
                            {item.valor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Fórmula aplicada */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('formula')}
            >
              <span><Calculator size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Fórmula Aplicada</span>
              <span className="toggle-icon">{expanded.formula ? '−' : '+'}</span>
            </button>
            {expanded.formula && (
              <div className="accordion-content">
                <div className="formula-box">
                  <p className="formula-main">t = (x̄ - μ₀) / (s / √n)</p>
                  <div className="formula-components">
                    <div className="component">
                      <span className="symbol">x̄</span>
                      <span className="definition">= Utilidad neta promedio</span>
                    </div>
                    <div className="component">
                      <span className="symbol">μ₀</span>
                      <span className="definition">= 0 (valor de contraste)</span>
                    </div>
                    <div className="component">
                      <span className="symbol">s</span>
                      <span className="definition">= Desviación estándar muestral</span>
                    </div>
                    <div className="component">
                      <span className="symbol">n</span>
                      <span className="definition">= Número de observaciones</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Resultados */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('resultados')}
            >
              <span><BarChart2 size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Resultados del Análisis</span>
              <span className="toggle-icon">{expanded.resultados ? '−' : '+'}</span>
            </button>
            {expanded.resultados && (
              <div className="accordion-content">
                <div className="resultados-grid">
                  <div className="resultado-item">
                    <span className="label">Observaciones (n)</span>
                    <span className="valor">{analisis.n}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Grados de Libertad (n-1)</span>
                    <span className="valor">{analisis.gl}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Media Muestral (x̄)</span>
                    <span className="valor">{formatearValor(analisis.media)}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Desviación Estándar (s)</span>
                    <span className="valor">{formatearValor(analisis.desviacion)}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Estadístico t</span>
                    <span className="valor">{analisis.tStatistic.toFixed(4)}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Valor Crítico (α=0.05)</span>
                    <span className="valor">{analisis.valorCritico.toFixed(4)}</span>
                  </div>
                  <div className="resultado-item highlight">
                    <span className="label">p-value</span>
                    <span className="valor">{analisis.pValue.toFixed(6)}</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Nivel de Significancia (α)</span>
                    <span className="valor">0.05</span>
                  </div>
                  <div className="resultado-item">
                    <span className="label">Nivel de Confianza</span>
                    <span className="valor">95%</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Decisión */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('decision')}
            >
              <span><Scale size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Decisión Estadística</span>
              <span className="toggle-icon">{expanded.decision ? '−' : '+'}</span>
            </button>
            {expanded.decision && (
              <div className="accordion-content">
                <div className={`decision-box ${analisis.rechazaH0 ? 'rechaza' : 'no-rechaza'}`}>
                  {analisis.rechazaH0 ? (
                    <>
                      <h4><Check size={20} color="#10b981" style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> Se rechaza H₀</h4>
                      <div className="criterios-decision">
                        <p><strong>Criterio 1 (p-value):</strong> p-value ({analisis.pValue.toFixed(6)}) &lt; α (0.05) → <span className="criterio-cumple">Se rechaza H₀</span></p>
                        <p><strong>Criterio 2 (t-estadístico):</strong> t ({analisis.tStatistic.toFixed(4)}) &gt; t-crítico ({analisis.valorCritico.toFixed(4)}) → <span className="criterio-cumple">{analisis.rechazaPorT ? 'Se rechaza H₀' : 'No se rechaza H₀'}</span></p>
                      </div>
                      <p className="conclusion">
                        Existe <strong>evidencia estadística suficiente</strong> para afirmar que la utilidad neta promedio de la empresa es significativamente mayor que cero. Por lo tanto, la empresa <strong>es rentable</strong> durante el período analizado.
                      </p>
                    </>
                  ) : (
                    <>
                      <h4><X size={20} color="#ef4444" style={{verticalAlign: 'text-bottom', marginRight: '4px'}} /> No se rechaza H₀</h4>
                      <div className="criterios-decision">
                        <p><strong>Criterio 1 (p-value):</strong> p-value ({analisis.pValue.toFixed(6)}) ≥ α (0.05) → <span className="criterio-no-cumple">No se rechaza H₀</span></p>
                        <p><strong>Criterio 2 (t-estadístico):</strong> t ({analisis.tStatistic.toFixed(4)}) {analisis.rechazaPorT ? '>' : '≤'} t-crítico ({analisis.valorCritico.toFixed(4)}) → <span className="criterio-no-cumple">{analisis.rechazaPorT ? 'Se rechaza H₀' : 'No se rechaza H₀'}</span></p>
                      </div>
                      <p className="conclusion">
                        <strong>No existe evidencia estadística suficiente</strong> para afirmar que la utilidad neta promedio es significativamente mayor que cero. Por lo tanto, no podemos concluir de manera concluyente que la empresa sea rentable en este período.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Interpretación ejecutiva */}
          <section className="accordion-section">
            <button 
              className="accordion-header"
              onClick={() => toggleSection('interpretacion')}
            >
              <span><FileText size={18} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Interpretación Ejecutiva</span>
              <span className="toggle-icon">{expanded.interpretacion ? '−' : '+'}</span>
            </button>
            {expanded.interpretacion && (
              <div className="accordion-content">
                <div className="interpretacion-box">
                  <p>{generarInterpretacion()}</p>
                </div>
              </div>
            )}
          </section>

          {/* Tooltips informativos */}
          <section className="info-section">
            <h3><Info size={20} style={{verticalAlign: 'text-bottom', marginRight: '8px'}} /> Conceptos Clave</h3>
            <div className="tooltips-container">
              <div className="tooltip-item">
                <strong>p-value:</strong> Probabilidad de obtener un estadístico igual o más extremo que el observado, asumiendo que H₀ es verdadera. Valores menores indican mayor evidencia contra H₀.
              </div>
              <div className="tooltip-item">
                <strong>Hipótesis Nula (H₀):</strong> Afirmación que se asume verdadera inicialmente. Se rechaza solo si hay evidencia suficientemente fuerte.
              </div>
              <div className="tooltip-item">
                <strong>Nivel de Significancia (α):</strong> Umbral de probabilidad para decidir si rechazamos H₀. Comúnmente se usa 0.05 (5%), que corresponde a un 95% de confianza.
              </div>
              <div className="tooltip-item">
                <strong>Desviación Estándar:</strong> Medida de la dispersión o variabilidad de los datos respecto a la media.
              </div>
              <div className="tooltip-item">
                <strong>Grados de Libertad (g.l.):</strong> Número de valores independientes que varían en el cálculo. Para la prueba t de una muestra: g.l. = n - 1.
              </div>
              <div className="tooltip-item">
                <strong>Prueba t de Student:</strong> Prueba estadística que compara una muestra contra un valor de referencia. Es apropiada cuando desconocemos la desviación estándar poblacional.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
