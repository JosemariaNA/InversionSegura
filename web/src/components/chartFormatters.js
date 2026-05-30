/**
 * Formatea números grandes a K, M, o B
 * @param {number} value - Valor a formatear
 * @returns {string} Valor formateado
 */
export const formatChartValue = (value) => {
  if (value === null || value === undefined) return "0";
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1e9) {
    return (value / 1e9).toFixed(1) + "B";
  } else if (absValue >= 1e6) {
    return (value / 1e6).toFixed(1) + "M";
  } else if (absValue >= 1e3) {
    return (value / 1e3).toFixed(1) + "K";
  }
  
  return value.toFixed(0);
};

/**
 * Formatea números para el eje Y de gráficas
 * @param {number} value - Valor a formatear
 * @returns {string} Valor formateado
 */
export const formatYAxis = (value) => {
  if (value === null || value === undefined) return "0";
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1e9) {
    return "$" + (value / 1e9).toFixed(0) + "B";
  } else if (absValue >= 1e6) {
    return "$" + (value / 1e6).toFixed(0) + "M";
  } else if (absValue >= 1e3) {
    return "$" + (value / 1e3).toFixed(0) + "K";
  }
  
  return "$" + value.toFixed(0);
};
