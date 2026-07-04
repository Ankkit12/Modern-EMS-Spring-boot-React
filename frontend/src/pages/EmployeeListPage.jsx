import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { FiEye, FiEdit3, FiTrash2 } from 'react-icons/fi';
import '../styles/EmployeeListPage.css';

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      if (search.trim() !== '') {
        const data = await EmployeeService.searchEmployees(search);
        setEmployees(data || []);
        setTotal(data?.length || 0);
        return;
      }

      const data = await EmployeeService.getEmployeesByPage(page, size);

      if (Array.isArray(data)) {
        setEmployees(data);
        setTotal(data.length);
      } else if (data.content) {
        setEmployees(data.content);
        setTotal(data.totalElements || 0);
      } else {
        setEmployees([]);
        setTotal(0);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch employees');
      toast.error(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;

    try {
      await EmployeeService.deleteEmployee(id);

      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== id)
      );

      toast.success('Employee deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleView = (id) => navigate(`/employees/${id}`);
  const handleEdit = (id) => navigate(`/employees/edit/${id}`);
  const handleAdd = () => navigate('/employees/add');

  return (
    <div className="employee-list-page">

      <div className="page-header">
        <h1>Employee Management</h1>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={
  !(
    user?.roles?.includes("ROLE_MANAGER") ||
    user?.roles?.includes("ROLE_ADMIN")
  )
}
        >
          + Add Employee
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={fetchEmployees}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : employees.length === 0 ? (
        <div className="no-data">
          No employees found
        </div>
      ) : (
        <div className="table-container">

          <table className="employee-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((employee) => (

                <tr key={employee.id}>

                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>

                  <td className="actions">

                    <button
                      className="icon-btn"
                      title="View"
                      onClick={() => handleView(employee.id)}
                    >
                      <FiEye size={16} />
                    </button>

                    {(
  user?.roles?.includes("ROLE_MANAGER") ||
  user?.roles?.includes("ROLE_ADMIN")
) && (
                      <button
                        className="icon-btn edit"
                        title="Edit"
                        onClick={() => handleEdit(employee.id)}
                      >
                        <FiEdit3 size={16} />
                      </button>
                    )}

                    {user?.roles?.includes("ROLE_ADMIN") && (
                      <button
                        className="icon-btn danger"
                        title="Delete"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Pagination
          page={page}
          size={size}
          total={total}
          onChange={(p) => setPage(p)}
        />
      </div>

    </div>
  );
}