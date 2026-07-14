import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { User, PiggyBank, Search, Settings, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children, onSearch, hideSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const nombre = localStorage.getItem('nombre');
  
  const [simbolo, setSimbolo] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menu = [
    { path: '/perfil', name: 'Mi Perfil', icon: <User size={20} />, id: 'perfil' },
    { path: '/control', name: 'Control Financiero', icon: <PiggyBank size={20} />, id: 'control' },
    { path: '/buscar', name: 'Buscar Empresas', icon: <Search size={20} />, id: 'buscar' },
  ];

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-mobile">
          <button className="mobile-close-btn" onClick={closeSidebar}>
            <X size={24} color="#fff" />
          </button>
        </div>

        <div 
          className="sidebar-brand" 
          onClick={() => { navigate('/'); closeSidebar(); }}
          style={{ cursor: 'pointer' }}
        >
          <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">Inversión Segura</span>
        </div>

        <div className="sidebar-section">
          <p className="section-title">Panel Principal</p>
          <p className="section-subtitle">Menú</p>
          <nav className="sidebar-menu">
            {menu.map((item) => {
              const isActive = location.pathname === item.path || (item.id === 'buscar' && location.pathname.startsWith('/empresa'));
              return (
                <div 
                  key={item.id} 
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => { navigate(item.path); closeSidebar(); }}
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
          <div className="topbar-left-mobile">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={24} color="#fff" />
            </button>
          </div>

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
            <button className="btn-logout" onClick={cerrarSesion}>Cerrar</button>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-container" onClick={closeSidebar}>
          {children}
        </div>
      </main>
    </div>
  );
}
