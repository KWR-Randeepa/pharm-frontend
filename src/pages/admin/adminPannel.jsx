
import React from "react";

import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import AdminAddMedicinePage from "./addMedicine";
import AddMedicine from "./AddTestMed";
import Products from "./Product";
import Dashboard from "./dashbord";
import OrderList from "./Orders";

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
  ),
  Orders: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  )
};

// --- CSS STYLES ---
const styles = `
  /* Reset & Base */
  Here is the refined CSS for your Sidebar.

I have updated it to use the Dark Emerald Theme (emerald-950), which creates a professional, high-contrast look against your light content area. I also added a :root section so you can use these variables globally if you wish.

CSS

/* Sidebar.css */

:root {
  --emerald-50: #ecfdf5;
  --emerald-100: #d1fae5;
  --emerald-200: #a7f3d0;
  --emerald-300: #6ee7b7;
  --emerald-400: #34d399;
  --emerald-500: #10b981;
  --emerald-600: #059669;
  --emerald-700: #047857;
  --emerald-800: #065f46;
  --emerald-900: #064e3b;
  --emerald-950: #022c22;
}
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
  /* Darkest Emerald for a premium deep background */
  background-color: var(--emerald-950); 
  color: var(--emerald-100);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.3s;
  /* Optional: Add a subtle shadow to separate from content */
  box-shadow: 4px 0 10px rgba(2, 44, 34, 0.1); 
}

.sidebar-header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  /* Dark separator line */
  border-bottom: 1px solid var(--emerald-900); 
  font-size: 1.25rem;
  font-weight: bold;
  letter-spacing: 1px;
  /* Bright Green for the Logo/Brand to pop */
  color: var(--emerald-400); 
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
  /* Softer green for inactive links */
  color: var(--emerald-200); 
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-size: 0.95rem;
  border-left: 4px solid transparent; /* Placeholder for hover effect */
}

.menu-link:hover {
  /* Slightly lighter background on hover */
  background-color: var(--emerald-900); 
  color: var(--emerald-50);
  border-left-color: var(--emerald-600);
}

.menu-link.active {
  /* Vibrant Green Background for the active item */
  background: linear-gradient(90deg, var(--emerald-800) 0%, var(--emerald-900) 100%);
  color: #ffffff;
  /* Bright accent strip on the left */
  border-left: 4px solid var(--emerald-400); 
  font-weight: 600;
}

.menu-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  /* Ensure icons inherit the color changes */
  color: inherit; 
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
    background-color: #ebf5fb;
    color: #3498db;
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
          <Link to="/admin/pannel/orders" className={`menu-link ${isActive("/admin/pannel/orders")}`}>
            <span className="menu-icon"><Icons.Orders /></span>
            Orders
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

      <Sidebar />
      <main className="main-content">

        <div className="content-scrollable">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-product" element={<AddMedicine />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<OrderList />} />

          </Routes>
        </div>
      </main>
    </div>
  );
}
