import React, { useEffect, useState, useContext } from 'react';
import EmployeeService from '../services/EmployeeService';
import '../styles/DashboardPage.css';
import AuthContext from '../context/AuthContext';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total:0, active:0, departments:0 });

  useEffect(() => {
    // derive simple stats from employees
    const load = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        const total = Array.isArray(data)? data.length: 0;
        const active = total; // placeholder
        const departments = new Set((data||[]).map(e=> e.department).filter(Boolean)).size;
        setStats({ total, active, departments });
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="greeting">Welcome{user ? `, ${user.username}` : ''}</div>
        <div className="subtitle">Dashboard overview</div>
      </div>
      <div className="cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p className="big">{stats.total}</p>
        </div>
        <div className="card">
          <h3>Active Employees</h3>
          <p className="big">{stats.active}</p>
        </div>
        <div className="card">
          <h3>Departments</h3>
          <p className="big">{stats.departments}</p>
        </div>
      </div>
    </div>
  );
}
