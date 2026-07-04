import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data));
  }, []);

  const cards = [
    { label:'Total Sensors', value:stats.totalSensors||0,
      icon:'📡', color:'#1a56db' },
    { label:'Total Zones', value:stats.totalZones||0,
      icon:'🗺️', color:'#7c3aed' },
    { label:'Total Alerts', value:stats.totalAlerts||0,
      icon:'🔔', color:'#ea580c' },
    { label:'Active Alerts', value:stats.activeAlerts||0,
      icon:'🚨', color:'#dc2626' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#f1f5f9' }}>
      {/* Navbar */}
      <div style={{ background:'#1a1a2e', padding:'14px 24px',
        display:'flex', justifyContent:'space-between',
        alignItems:'center' }}>
        <h2 style={{ color:'#fff', margin:0, fontSize:'18px' }}>
          ⛏️ Rockfall Prediction System
        </h2>
        <div style={{ display:'flex', gap:'12px' }}>
          {[['Dashboard','/dashboard'],['Sensors','/sensors'],
            ['Alerts','/alerts'],['AI Predict','/predict']
          ].map(([label, path]) => (
            <button key={path} onClick={() => navigate(path)}
              style={{ background:'transparent', color:'#fff',
                border:'1px solid #ffffff44', padding:'6px 14px',
                borderRadius:'6px', cursor:'pointer',
                fontSize:'13px' }}>
              {label}
            </button>
          ))}
          <button onClick={() => {
            localStorage.clear(); navigate('/');
          }} style={{ background:'#dc2626', color:'#fff',
            border:'none', padding:'6px 14px',
            borderRadius:'6px', cursor:'pointer',
            fontSize:'13px' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding:'24px' }}>
        <h3 style={{ color:'#1a1a2e', marginBottom:'20px' }}>
          Welcome, {user.name || 'Admin'} 👋
        </h3>

        {/* Stat Cards */}
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(4,1fr)', gap:'16px',
          marginBottom:'24px' }}>
          {cards.map(card => (
            <div key={card.label} style={{ background:'#fff',
              padding:'20px', borderRadius:'12px',
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
              borderTop:`4px solid ${card.color}` }}>
              <div style={{ fontSize:'28px' }}>{card.icon}</div>
              <div style={{ fontSize:'28px', fontWeight:'700',
                color:card.color }}>{card.value}</div>
              <div style={{ fontSize:'13px', color:'#666',
                marginTop:'4px' }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Risk Legend */}
        <div style={{ background:'#fff', padding:'20px',
          borderRadius:'12px',
          boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
          <h4 style={{ margin:'0 0 16px', color:'#1a1a2e' }}>
            Risk Level Guide
          </h4>
          <div style={{ display:'flex', gap:'16px',
            flexWrap:'wrap' }}>
            {[
              ['🟢','GREEN','0-24','Normal operations'],
              ['🟡','YELLOW','25-49','Monitor closely'],
              ['🟠','ORANGE','50-74','Prepare evacuation'],
              ['🔴','RED','75-100','Immediate evacuation'],
            ].map(([icon,level,range,action]) => (
              <div key={level} style={{ padding:'12px 16px',
                background:'#f8fafc', borderRadius:'8px',
                flex:'1', minWidth:'160px' }}>
                <div style={{ fontSize:'20px' }}>{icon}</div>
                <div style={{ fontWeight:'600',
                  fontSize:'14px' }}>{level} ({range})</div>
                <div style={{ fontSize:'12px',
                  color:'#666' }}>{action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}