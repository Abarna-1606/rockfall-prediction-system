import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAlerts } from '../services/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAlerts().then(r => setAlerts(r.data));
  }, []);

  const colors = {
    RED:{ bg:'#fee2e2', text:'#dc2626' },
    ORANGE:{ bg:'#ffedd5', text:'#ea580c' },
    YELLOW:{ bg:'#fef9c3', text:'#ca8a04' },
    GREEN:{ bg:'#dcfce7', text:'#16a34a' },
  };

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

      <div style={{ padding:'24px' }}>
        <h3 style={{ color:'#1a1a2e', marginBottom:'20px' }}>
          🔔 Alert History
        </h3>
        {alerts.length === 0 ? (
          <div style={{ background:'#fff', padding:'40px',
            borderRadius:'12px', textAlign:'center',
            color:'#666', fontSize:'15px' }}>
            No alerts found. Use AI Predict to generate alerts.
          </div>
        ) : (
          <div style={{ background:'#fff', borderRadius:'12px',
            boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
            overflow:'hidden' }}>
            <table style={{ width:'100%',
              borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#1a1a2e' }}>
                  {['ID','Zone','Risk Score','Alert Level',
                    'Message','Status'
                  ].map(h => (
                    <th key={h} style={{ padding:'12px 16px',
                      color:'#fff', textAlign:'left',
                      fontSize:'13px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alerts.map((a, i) => (
                  <tr key={a.id} style={{
                    background: i%2===0 ? '#fff' : '#f8fafc',
                    borderBottom:'1px solid #e2e8f0' }}>
                    <td style={{ padding:'12px 16px',
                      fontSize:'14px' }}>{a.id}</td>
                    <td style={{ padding:'12px 16px',
                      fontSize:'14px' }}>
                      {a.zone?.zoneName || '-'}
                    </td>
                    <td style={{ padding:'12px 16px',
                      fontSize:'14px',
                      fontWeight:'600' }}>
                      {a.riskScore}
                    </td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{
                        padding:'3px 10px',
                        borderRadius:'20px',
                        fontSize:'12px', fontWeight:'600',
                        background: colors[a.alertLevel]?.bg,
                        color: colors[a.alertLevel]?.text }}>
                        {a.alertLevel}
                      </span>
                    </td>
                    <td style={{ padding:'12px 16px',
                      fontSize:'13px',
                      color:'#444' }}>{a.message}</td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{
                        padding:'3px 10px',
                        borderRadius:'20px',
                        fontSize:'12px', fontWeight:'600',
                        background: a.isResolved
                          ? '#dcfce7' : '#fee2e2',
                        color: a.isResolved
                          ? '#16a34a' : '#dc2626' }}>
                        {a.isResolved ? 'Resolved' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}