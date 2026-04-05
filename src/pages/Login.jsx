import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("userName", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  const handleOAuth = (provider) => {
    alert(`${provider} Login simulated! In production, this redirects to OAuth URI.`);
    localStorage.setItem("token", "dummy_token_"+provider);
    localStorage.setItem("userName", provider + " User");
    navigate("/dashboard");
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: "center", marginBottom: '30px' }}>
          <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: 0 }}>
            <Sparkles size={28} color="#6a5cff" /> Login <Sparkles size={28} color="#00c6ff" />
          </h2>
          <p style={{ color: '#555' }}>Access your interview coach</p>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="glass-textarea" 
              style={{ minHeight: '45px', paddingLeft: '45px', marginBottom: 0, height: '45px' }} 
              required 
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="glass-textarea" 
              style={{ minHeight: '45px', paddingLeft: '45px', paddingRight: '45px', marginBottom: 0, height: '45px' }} 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
            >
              {showPassword ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
            </button>
          </div>
          <div style={{ textAlign: 'right', marginTop: '-5px' }}>
            <Link to="/forgot-password" style={{ color: '#00c6ff', fontSize: '14px', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>
          <button type="submit" className="glass-button" style={{ justifyContent: 'center', marginTop: '10px' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>Or continue with 🔐</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => handleOAuth("Google")} style={socialBtnStyle}>🌐 Google</button>
            <button onClick={() => handleOAuth("GitHub")} style={socialBtnStyle}>🐙 GitHub</button>
            <button onClick={() => handleOAuth("LinkedIn")} style={socialBtnStyle}>💼 LinkedIn</button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#555' }}>
          Don't have an account? <Link to="/register" style={{ color: '#6a5cff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

const socialBtnStyle = {
  background: 'rgba(255,255,255,0.7)',
  border: '1px solid #ddd',
  padding: '10px 15px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  color: '#444',
  transition: '0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
