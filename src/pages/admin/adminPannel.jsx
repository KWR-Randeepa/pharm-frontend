import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import AdminAddMedicinePage from "./addMedicine";

// --- INLINE SVG ICONS (Replaces react-icons) ---
const Icons = {
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  ),
  List: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Package: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  )
};

// --- CSS STYLES ---
const styles = `
  /* Reset & Base */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f6f9;
    color: #333;
  }

  /* Layout */
  .admin-container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
  }

  /* Sidebar */
  .sidebar {
    width: 260px;
    background-color: #1b4332; /* Dark Blue-Grey */
    color: #ecf0f1;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.3s;
  }

  .sidebar-header {
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 1px;
    color: #d8f3dc; /* Accent Color */
  }

  .sidebar-menu {
    flex: 1;
    padding: 20px 0;
    list-style: none;
  }

  .menu-item {
    margin-bottom: 5px;
  }

  .menu-link {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    color: #bdc3c7;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight:bold;
  }

  .menu-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .menu-link.active {
    background-color: #74c69d;
    color: white;
    border-left: 4px solid #ecf0f1;
  }

  .menu-icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
  }

  /* Main Content Area */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .top-bar {
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }

  .page-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
  }

  .content-scrollable {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
  }

  /* Dashboard Placeholder */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #d8f3dc;
    color: #40916c;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  .stat-info h3 {
    font-size: 0.9rem;
    color: #7f8c8d;
    font-weight: normal;
  }

  .stat-info p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
  }
`;

// --- COMPONENTS ---

// 1. Dashboard Component (Placeholder)
function Dashboard() {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-icon"><Icons.Package /></div>
        <div className="stat-info">
          <h3>Total Products</h3>
          <p>124</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><Icons.List /></div>
        <div className="stat-info">
          <h3>Low Stock</h3>
          <p>12</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon"><Icons.Grid /></div>
        <div className="stat-info">
          <h3>Categories</h3>
          <p>8</p>
        </div>
      </div>
    </div>
  );
}

// 2. Sidebar Component
function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path) ? "active" : "";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        MEDIFIND ADMIN
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/admin/pannel/dashboard" className={`menu-link ${isActive("/admin/pannel/dashboard")}`}>
            <span className="menu-icon"><Icons.Grid /></span>
            Dashboard
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/pannel/products" className={`menu-link ${isActive("/admin/pannel/products")}`}>
            <span className="menu-icon"><Icons.List /></span>
            Products
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/pannel/add-product" className={`menu-link ${isActive("/admin/pannel/add-product")}`}>
            <span className="menu-icon"><Icons.Plus /></span>
            Add Product
          </Link>
        </li>
      </ul>
    </div>
  );
}

// 3. Main Layout Component
export default function AdminPanel() {
  return (
    <div className="admin-container">
      <style>{styles}</style>
      <Toaster position="top-right" />
      <Sidebar />
      <main className="main-content">

        <div className="content-scrollable">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-product" element={<AdminAddMedicinePage />} />
            <Route path="products" element={
              <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>
                <h3>Product List View</h3>
                <p>Displaying medicine inventory here...</p>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}
