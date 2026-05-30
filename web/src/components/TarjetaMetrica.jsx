import "./estilos/TarjetaMetrica.css";

export default function TarjetaMetrica({ titulo, valor, color = "#3b82f6" }) {

  const formatear = (n) => {
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

  return (
    <div 
      className="tarjeta-metrica"
      style={{
        '--color-primary': color,
        '--color-light': color + '20',
        '--color-border': color + '50'
      }}
    >
      <div className="color-indicator" style={{ backgroundColor: color }}></div>
      <h4>{titulo}</h4>
      <h2>{formatear(valor)}</h2>
    </div>
  );
}