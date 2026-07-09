import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(
      'https://rockfall-backend-0mqf.onrender.com/api/sensors'
    ).catch(() => {});
  }, []);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center',
      alignItems:'center', height:'100vh',
      background:'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <div style={{ background:'#fff', padding:'40px',
        borderRadius:'16px', width:'360px',
        boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign:'center', marginBottom:'24px' }}>
          <div style={{ fontSize:'40px' }}>⛏️</div>
          <h2 style={{ color:'#1a1a2e', margin:'8px 0 4px' }}>
            Rockfall Alert System
          </h2>
          <p style={{ color:'#666', fontSize:'13px' }}>
            AI-Based Open Pit Mine Safety
          </p>
        </div>

        {error && (
          <div style={{ background:'#fee2e2', color:'#dc2626',
            padding:'8px 12px', borderRadius:'8px',
            marginBottom:'12px', fontSize:'13px' }}>
            {error}
          </div>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width:'100%', padding:'10px',
            margin:'6px 0', border:'1px solid #ddd',
            borderRadius:'8px', fontSize:'14px',
            boxSizing:'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width:'100%', padding:'10px',
            margin:'6px 0', border:'1px solid #ddd',
            borderRadius:'8px', fontSize:'14px',
            boxSizing:'border-box' }}
        />
        <button
          onClick={handleLogin}
          style={{ width:'100%', padding:'12px',
            background:'#1a56db', color:'#fff',
            border:'none', borderRadius:'8px',
            fontSize:'15px', cursor:'pointer',
            marginTop:'12px', fontWeight:'600' }}>
          Login
        </button>

        <p style={{ textAlign:'center', fontSize:'13px',
          color:'#666', marginTop:'16px' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color:'#1a56db', cursor:'pointer',
              fontWeight:'600' }}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}