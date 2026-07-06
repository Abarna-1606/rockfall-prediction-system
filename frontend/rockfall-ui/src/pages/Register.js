import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    confirmPassword: '', role: 'OPERATOR'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email ||
        !form.password || !form.confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await axios.post(
  'https://rockfall-backend-0mqf.onrender.com/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      setSuccess('Registration successful! Redirecting...');
      setError('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Email already exists or registration failed');
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center',
      alignItems:'center', minHeight:'100vh',
      background:'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <div style={{ background:'#fff', padding:'40px',
        borderRadius:'16px', width:'400px',
        boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign:'center', marginBottom:'24px' }}>
          <h2 style={{ color:'#1a1a2e', margin:'8px 0 4px' }}>
            Create Account
          </h2>
          <p style={{ color:'#666', fontSize:'13px' }}>
            AI-Based Rockfall Alert System
          </p>
        </div>

        {error && (
          <div style={{ background:'#fee2e2', color:'#dc2626',
            padding:'8px 12px', borderRadius:'8px',
            marginBottom:'12px', fontSize:'13px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background:'#dcfce7', color:'#16a34a',
            padding:'8px 12px', borderRadius:'8px',
            marginBottom:'12px', fontSize:'13px' }}>
            {success}
          </div>
        )}

        <div style={{ marginBottom:'12px' }}>
          <label style={{ fontSize:'13px', fontWeight:'600',
            color:'#374151', display:'block',
            marginBottom:'4px' }}>Full Name</label>
          <input
            placeholder="Enter your full name"
            value={form.name}
            onChange={e => setForm({...form,
              name:e.target.value})}
            style={{ width:'100%', padding:'10px',
              border:'1px solid #ddd', borderRadius:'8px',
              fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <div style={{ marginBottom:'12px' }}>
          <label style={{ fontSize:'13px', fontWeight:'600',
            color:'#374151', display:'block',
            marginBottom:'4px' }}>Email</label>
          <input
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm({...form,
              email:e.target.value})}
            style={{ width:'100%', padding:'10px',
              border:'1px solid #ddd', borderRadius:'8px',
              fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <div style={{ marginBottom:'12px' }}>
          <label style={{ fontSize:'13px', fontWeight:'600',
            color:'#374151', display:'block',
            marginBottom:'4px' }}>Role</label>
          <select
            value={form.role}
            onChange={e => setForm({...form,
              role:e.target.value})}
            style={{ width:'100%', padding:'10px',
              border:'1px solid #ddd', borderRadius:'8px',
              fontSize:'14px', boxSizing:'border-box',
              background:'#fff' }}>
            <option value="OPERATOR">Mine Operator</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div style={{ marginBottom:'12px' }}>
          <label style={{ fontSize:'13px', fontWeight:'600',
            color:'#374151', display:'block',
            marginBottom:'4px' }}>Password</label>
          <input
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={e => setForm({...form,
              password:e.target.value})}
            style={{ width:'100%', padding:'10px',
              border:'1px solid #ddd', borderRadius:'8px',
              fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <div style={{ marginBottom:'20px' }}>
          <label style={{ fontSize:'13px', fontWeight:'600',
            color:'#374151', display:'block',
            marginBottom:'4px' }}>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={e => setForm({...form,
              confirmPassword:e.target.value})}
            style={{ width:'100%', padding:'10px',
              border:'1px solid #ddd', borderRadius:'8px',
              fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <button onClick={handleRegister}
          style={{ width:'100%', padding:'12px',
            background:'#1a56db', color:'#fff',
            border:'none', borderRadius:'8px',
            fontSize:'15px', cursor:'pointer',
            fontWeight:'600' }}>
          Register
        </button>

        <p style={{ textAlign:'center', fontSize:'13px',
          color:'#666', marginTop:'16px' }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/')}
            style={{ color:'#1a56db', cursor:'pointer',
              fontWeight:'600' }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}