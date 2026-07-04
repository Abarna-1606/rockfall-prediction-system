import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictRisk, saveAlert } from '../services/api';

export default function Predict() {
  const [form, setForm] = useState({
    seismic: '', slope: '', rainfall: '', vibration: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const colors = {
    GREEN: { bg:'#dcfce7', text:'#16a34a', border:'#16a34a' },
    YELLOW:{ bg:'#fef9c3', text:'#ca8a04', border:'#ca8a04' },
    ORANGE:{ bg:'#ffedd5', text:'#ea580c', border:'#ea580c' },
    RED:   { bg:'#fee2e2', text:'#dc2626', border:'#dc2626' },
  };

  const handlePredict = async () => {
    if (!form.seismic || !form.slope ||
        !form.rainfall || !form.vibration) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    setSaved(false);
    try {
      const res = await predictRisk({
        seismic: parseFloat(form.seismic),
        slope: parseFloat(form.slope),
        rainfall: parseFloat(form.rainfall),
        vibration: parseFloat(form.vibration),
      });
      setResult(res.data);
    } catch (err) {
      alert('Prediction failed. Check backend is running.');
    }
    setLoading(false);
  };

  const handleSaveAlert = async () => {
    try {
      await saveAlert({
        riskScore: result.riskScore,
        alertLevel: result.alertLevel,
        message: result.message,
        isResolved: false,
        zone: { id: 1 }
      });
      setSaved(true);
      alert('Alert saved successfully!');
    } catch (err) {
      alert('Failed to save alert.');
    }
  };

  const fields = [
    { key:'seismic', label:'Seismic Value',
      icon:'🌊', placeholder:'e.g. 45',
      hint:'Geophone reading (0-100)' },
    { key:'slope', label:'Slope Angle Delta',
      icon:'📐', placeholder:'e.g. 60',
      hint:'Inclinometer reading (0-100)' },
    { key:'rainfall', label:'Rainfall (mm)',
      icon:'🌧️', placeholder:'e.g. 30',
      hint:'Cumulative rainfall (0-100)' },
    { key:'vibration', label:'Vibration RMS',
      icon:'📳', placeholder:'e.g. 20',
      hint:'Accelerometer reading (0-100)' },
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

      <div style={{ padding:'24px', maxWidth:'700px',
        margin:'0 auto' }}>
        <h3 style={{ color:'#1a1a2e', marginBottom:'20px' }}>
          🤖 AI Rockfall Risk Predictor
        </h3>

        {/* Input Form */}
        <div style={{ background:'#fff', padding:'24px',
          borderRadius:'12px',
          boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
          marginBottom:'20px' }}>
          <p style={{ color:'#666', fontSize:'13px',
            marginBottom:'20px' }}>
            Enter sensor readings to predict rockfall risk level
          </p>
          <div style={{ display:'grid',
            gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ fontSize:'13px',
                  fontWeight:'600', color:'#374151',
                  display:'block', marginBottom:'4px' }}>
                  {f.icon} {f.label}
                </label>
                <input
                  type="number"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={e => setForm({
                    ...form, [f.key]: e.target.value
                  })}
                  style={{ width:'100%', padding:'10px',
                    border:'1px solid #ddd',
                    borderRadius:'8px', fontSize:'14px',
                    boxSizing:'border-box' }}
                />
                <p style={{ fontSize:'11px', color:'#999',
                  margin:'3px 0 0' }}>{f.hint}</p>
              </div>
            ))}
          </div>

          <button onClick={handlePredict} disabled={loading}
            style={{ width:'100%', padding:'12px',
              background: loading ? '#93c5fd' : '#1a56db',
              color:'#fff', border:'none',
              borderRadius:'8px', fontSize:'15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop:'20px', fontWeight:'600' }}>
            {loading ? '⏳ Predicting...' : '🔍 Predict Risk'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{ background:'#fff', padding:'24px',
            borderRadius:'12px',
            boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
            border:`2px solid ${colors[result.alertLevel]?.border}` }}>
            <h4 style={{ margin:'0 0 16px', color:'#1a1a2e' }}>
              Prediction Result
            </h4>
            <div style={{ display:'flex',
              alignItems:'center', gap:'16px',
              marginBottom:'16px' }}>
              <div style={{ fontSize:'48px' }}>
                {result.alertLevel==='RED' ? '🔴' :
                 result.alertLevel==='ORANGE' ? '🟠' :
                 result.alertLevel==='YELLOW' ? '🟡' : '🟢'}
              </div>
              <div>
                <div style={{ fontSize:'24px', fontWeight:'700',
                  color: colors[result.alertLevel]?.text }}>
                  {result.alertLevel} ALERT
                </div>
                <div style={{ fontSize:'16px', color:'#444' }}>
                  Risk Score: <strong>{result.riskScore}</strong>/100
                </div>
              </div>
            </div>
            <div style={{
              padding:'12px 16px', borderRadius:'8px',
              background: colors[result.alertLevel]?.bg,
              color: colors[result.alertLevel]?.text,
              fontWeight:'500', marginBottom:'16px' }}>
              {result.message}
            </div>
            <button onClick={handleSaveAlert} disabled={saved}
              style={{ padding:'10px 24px',
                background: saved ? '#6b7280' : '#16a34a',
                color:'#fff', border:'none',
                borderRadius:'8px', cursor: saved
                  ? 'not-allowed' : 'pointer',
                fontSize:'14px', fontWeight:'600' }}>
              {saved ? '✅ Alert Saved' : '💾 Save Alert'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}