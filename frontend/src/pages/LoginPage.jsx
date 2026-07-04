import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(username.trim(), password);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
      const msg = err?.message || 'Login failed';
      toast.error('Login failed: ' + msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign in to Acme HR</h2>

        <form onSubmit={submit}>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
