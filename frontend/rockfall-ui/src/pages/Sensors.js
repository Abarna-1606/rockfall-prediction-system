import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSensors, deleteSensor } from '../services/api';

export default function Sensors() {
  const [sensors, setSensors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSensors().then(r => setSensors(r.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this sensor?')) {
      await deleteSensor(id);
      setSensors(sensors.filter(s => s.id !== id));
    }
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
          📡 Sensor Management
        </h3>
        <div style={{ background:'#fff', borderRadius:'12px',
          boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
          overflow:'hidden' }}>
          <table style={{ width:'100%',
            borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#1a1a2e' }}>
                {['ID','Sensor Name','Type','Zone',
                  'Location','Risk Level','Status','Action'
                ].map(h => (
                  <th key={h} style={{ padding:'12px 16px',
                    color:'#fff', textAlign:'left',
                    fontSize:'13px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sensors.map((s, i) => (
                <tr key={s.id} style={{
                  background: i%2===0 ? '#fff' : '#f8fafc',
                  borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'12px 16px',
                    fontSize:'14px' }}>{s.id}</td>
                  <td style={{ padding:'12px 16px',
                    fontSize:'14px',
                    fontWeight:'500' }}>{s.sensorName}</td>
                  <td style={{ padding:'12px 16px',
                    fontSize:'14px' }}>{s.type}</td>
                  <td style={{ padding:'12px 16px',
                    fontSize:'14px' }}>
                    {s.zone?.zoneName || '-'}
                  </td>
                  <td style={{ padding:'12px 16px',
                    fontSize:'14px' }}>
                    {s.zone?.location || '-'}
                  </td>
                  <td style={{ padding:'12px 16px' }}>
                    <span style={{
                      padding:'3px 10px', borderRadius:'20px',
                      fontSize:'12px', fontWeight:'600',
                      background: s.zone?.riskLevel==='HIGH'
                        ? '#fee2e2' : '#dcfce7',
                      color: s.zone?.riskLevel==='HIGH'
                        ? '#dc2626' : '#16a34a' }}>
                      {s.zone?.riskLevel || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding:'12px 16px' }}>
                    <span style={{
                      padding:'3px 10px', borderRadius:'20px',
                      fontSize:'12px', fontWeight:'600',
                      background:'#dbeafe', color:'#1d4ed8' }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding:'12px 16px' }}>
                    <button onClick={() => handleDelete(s.id)}
                      style={{ background:'#fee2e2',
                        color:'#dc2626', border:'none',
                        padding:'5px 12px', borderRadius:'6px',
                        cursor:'pointer', fontSize:'13px' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}