import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topnav">
      <div className="left">
        <div className="logo">Acme HR</div>
      </div>

      <nav className="center">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
        <NavLink to="/employees" className={({ isActive }) => (isActive ? 'active' : '')}>Employees</NavLink>
        {user?.role === 'ADMIN' && (
          <NavLink to="/employees/add" className={({ isActive }) => (isActive ? 'active' : '')}>Add Employee</NavLink>
        )}
      </nav>

      <div className="right">
        {user ? (
          <>
            <div className="user-info">
              <span className="username">{user.username}</span>
            </div>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="login-link">Login</NavLink>
        )}
      </div>
    </header>
  );
}
