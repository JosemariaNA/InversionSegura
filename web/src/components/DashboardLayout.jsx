import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, PiggyBank, Search, Settings } from 'lucide-react';

export default function DashboardLayout({ children, onSearch, hideSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const nombre = localStorage.getItem('nombre');
  
  const [simbolo, setSimbolo] = useState('');

  const menu = [
    { path: '/perfil', name: 'Mi Perfil', icon: <User size={20} />, id: 'perfil' },
    { path: '/control', name: 'Control Financiero', icon: <PiggyBank size={20} />, id: 'control' },
    { path: '/buscar', name: 'Buscar Empresas', icon: <Search size={20} />, id: 'buscar' },
  ];

  // Logic for search from topbar
  const handleSearch = () => {
    if (simbolo.trim()) {
      if (onSearch) {
        onSearch(simbolo);
      } else {
        navigate(`/empresa/${simbolo.toUpperCase()}`);
      }
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div 
          className="sidebar-brand" 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">HighSpec</span>
        </div>

        <div className="sidebar-section">
          <p className="section-title">Panel Principal</p>
          <p className="section-subtitle">Menú</p>
          <nav className="sidebar-menu">
            {menu.map((item) => {
              // Note: determining active state might be tricky depending on routes
              // Let's assume '/' is dashboard, '/empresa' is also related to search or control.
              // We'll just style the basic links.
              const isActive = location.pathname === item.path || (item.id === 'buscar' && location.pathname.startsWith('/empresa'));
              return (
                <div 
                  key={item.id} 
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <span className="version">Versión 1.3</span>
          <span className="collapse-icon">«</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-search">
            {!hideSearch && (
              <>
                <input 
                  type="text" 
                  placeholder="Buscar por ticker o nombre (ej: NVDA, AAPL)..." 
                  value={simbolo}
                  onChange={(e) => setSimbolo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-btn" onClick={handleSearch}>
                  <Search size={18} />
                </button>
              </>
            )}
          </div>

          <div className="topbar-user">
            <div className="user-profile">
              <span className="user-avatar"><User size={20} /></span>
              <span className="user-name">{nombre} <Settings size={16} style={{marginLeft: '4px'}} /></span>
            </div>
            <button className="btn-logout" onClick={cerrarSesion}>Cerrar sesión</button>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}
