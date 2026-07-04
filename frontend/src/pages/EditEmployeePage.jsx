import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-hot-toast';
import '../styles/EmployeeListPage.css';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const data = await EmployeeService.getEmployee(id);
      if (data) {
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email || '');
      }
    } catch (err) {
      toast.error('Failed to load employee: ' + (err.message || 'unknown'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // backend expects PUT /v1/employee/{id}
      await EmployeeService.updateEmployee({
  id: Number(id),
  firstName,
  lastName,
  email
});
      toast.success('Employee updated');
      navigate('/employees');
    } catch (err) {
      toast.error('Failed to update: ' + (err.message || 'unknown'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="employee-list-page">
      <div className="page-header">
        <h1>Edit Employee</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 12 }}>
          <label>First Name</label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Last Name</label>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
