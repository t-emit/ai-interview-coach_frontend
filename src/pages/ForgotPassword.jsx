import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';
import '../App.css';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP & new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      setMessage(`OTP Sent! (For testing: ${res.data.otp})`);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to request OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { email, otp, new_password: newPassword });
      alert("Password reset successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Reset failed");
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
        <div style={{ textAlign: "center", marginBottom: '30px' }}>
          <h2 style={{ margin: 0 }}>Reset Password</h2>
          <p style={{ color: '#555' }}>
            {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
          </p>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: '15px', textAlign: 'center', background: 'rgba(0,255,0,0.1)', padding: '10px', borderRadius: '8px' }}>{message}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="glass-textarea" 
                style={{ minHeight: '45px', paddingLeft: '45px', marginBottom: 0, height: '45px' }} 
                required 
              />
            </div>
            <button type="submit" className="glass-button" style={{ justifyContent: 'center', marginTop: '10px' }}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <KeyRound size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
              <input 
                type="text" 
                placeholder="6-digit OTP" 
                value={otp} 
                onChange={e => setOtp(e.target.value)}
                className="glass-textarea" 
                style={{ minHeight: '45px', paddingLeft: '45px', marginBottom: 0, height: '45px' }} 
                required 
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#888" style={{ position: 'absolute', top: 12, left: 15 }} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="New Password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)}
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
              Reset Password
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ color: '#00c6ff', fontSize: '14px', textDecoration: 'none' }}>Back to Login</Link>
        </div>
      </motion.div>
    </div>
  );
}
