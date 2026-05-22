import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login     from './pages/Login';
import Registro  from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Empresa   from './pages/Empresa';
import Navbar    from './components/Navbar';

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={
          <RutaProtegida><Dashboard /></RutaProtegida>
        } />
        <Route path="/empresa/:simbolo" element={
          <RutaProtegida><Empresa /></RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}