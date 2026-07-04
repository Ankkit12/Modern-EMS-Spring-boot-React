import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import DashboardPage from './pages/DashboardPage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeeListPage /></ProtectedRoute>} />
          <Route path="/employees/add" element={<ProtectedRoute roles={["ROLE_ADMIN","ROLE_MANAGER"]}><AddEmployeePage /></ProtectedRoute>} />
          <Route path="/employees/edit/:id" element={<ProtectedRoute roles={["ROLE_ADMIN","ROLE_MANAGER"]}><EditEmployeePage /></ProtectedRoute>} />
          <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetailsPage /></ProtectedRoute>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;