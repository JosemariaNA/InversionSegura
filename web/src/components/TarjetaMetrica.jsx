export default function TarjetaMetrica({ titulo, valor, color }) {
  return (
    <div className="tarjeta" style={{ borderLeft: `4px solid ${color}` }}>
      <p className="tarjeta-titulo">{titulo}</p>
      <p className="tarjeta-valor" style={{ color }}>{valor}</p>
    </div>
  );
}