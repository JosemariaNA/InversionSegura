import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login     from './pages/Login';
import Registro  from './pages/Registro';
import Inicio from './pages/Inicio';
import Blog from './pages/Blog';
import Ayuda from './pages/Ayuda';
import Nosotros from './pages/Nosotros';
import Legal from './pages/Legal';
import Dashboard from './pages/Dashboard';
import Empresa   from './pages/Empresa';
import Perfil    from './pages/Perfil';
import ControlFinanciero from './pages/ControlFinanciero';
import Navbar    from './components/Navbar';

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Inicio /></>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login"    element={<><Navbar /><Login /></>} />
        <Route path="/registro" element={<><Navbar /><Registro /></>} />
        <Route path="/control" element={
          <RutaProtegida><ControlFinanciero /></RutaProtegida>
        } />
        <Route path="/buscar" element={
          <RutaProtegida><Dashboard /></RutaProtegida>
        } />
        <Route path="/perfil" element={
          <RutaProtegida><Perfil /></RutaProtegida>
        } />
        <Route path="/empresa/:simbolo" element={
          <RutaProtegida><Empresa /></RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}