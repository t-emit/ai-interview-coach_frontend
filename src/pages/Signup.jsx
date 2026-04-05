import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import '../App.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  const handleOAuth = (provider) => {
    alert(`${provider} Signup simulated! In production, this redirects to OAuth URI.`);
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: "center", marginBottom: '30px' }}>
          <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: 0 }}>
            <Sparkles size={28} color="#00c6ff" /> Create Account <Sparkles size={28} color="#6a5cff" />
          </h2>
          <p style={{ color: '#555' }}>Join for the ultimate interview prep</p>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="glass-textarea" 
              style={{ minHeight: '45px', paddingLeft: '45px', marginBottom: 0, height: '45px' }} 
              required 
            />
          </div>
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
          <button type="submit" className="glass-button" style={{ justifyContent: 'center', marginTop: '10px' }}>
            Sign Up
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>Or register with 🔐</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => handleOAuth("Google")} style={socialBtnStyle}>🌐</button>
            <button onClick={() => handleOAuth("GitHub")} style={socialBtnStyle}>🐙</button>
            <button onClick={() => handleOAuth("LinkedIn")} style={socialBtnStyle}>💼</button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#555' }}>
          Already have an account? <Link to="/login" style={{ color: '#00c6ff', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

const socialBtnStyle = {
  background: 'rgba(255,255,255,0.7)',
  border: '1px solid #ddd',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '18px',
  transition: '0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
