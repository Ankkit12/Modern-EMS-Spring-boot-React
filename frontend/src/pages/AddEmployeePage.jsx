import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { toast } from 'react-hot-toast';
import '../styles/EmployeeListPage.css';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await EmployeeService.createEmployee({ firstName, lastName, email });
      toast.success('Employee added successfully');
      navigate('/employees');
    } catch (err) {
      toast.error('Failed to add employee: ' + (err.message || 'unknown'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="employee-list-page">
      <div className="page-header">
        <h1>Add Employee</h1>
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
            {saving ? 'Saving...' : 'Save'}
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
