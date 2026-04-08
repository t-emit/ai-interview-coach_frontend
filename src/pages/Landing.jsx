import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, UserPlus, PlayCircle, Star, Target } from 'lucide-react';
import '../App.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '40px 20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ fontSize: '3rem', color: '#1a1a1a', textShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
          AI Interview Coach <Bot size={40} style={{ verticalAlign: 'middle', marginLeft: '10px', color: '#00c6ff' }} />
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
          Your personal platform to master job interviews through intelligent simulations, real-time feedback, and dynamic question generation.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2, duration: 0.5 }}
        className="glass-card" 
        style={{ maxWidth: '800px', width: '100%', padding: '40px', marginBottom: '40px' }}
      >
        <h2 style={{ textAlign: 'center', color: '#6a5cff', marginBottom: '30px', fontSize: '2rem' }}>How it Works</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '15px' }}>
            <div style={{ background: 'rgba(106, 92, 255, 0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
              <UserPlus size={30} color="#6a5cff" />
            </div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '10px' }}>1. Sign Up</h3>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>Create an account to personalize your dashboard and save your progress over time.</p>
          </div>

          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '15px' }}>
            <div style={{ background: 'rgba(0, 198, 255, 0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
              <Target size={30} color="#00c6ff" />
            </div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '10px' }}>2. Set Your Goals</h3>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>Enter your target role and resume to build customized questions for your domain.</p>
          </div>

          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '15px' }}>
            <div style={{ background: 'rgba(255, 184, 108, 0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
              <PlayCircle size={30} color="#ffb86c" />
            </div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '10px' }}>3. Mock Interviews</h3>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>Engage in realistic technical and HR interviews with our AI coach.</p>
          </div>

          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '15px' }}>
            <div style={{ background: 'rgba(80, 250, 123, 0.2)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
              <Star size={30} color="#50fa7b" />
            </div>
            <h3 style={{ color: '#1a1a1a', marginBottom: '10px' }}>4. Get Feedback</h3>
            <p style={{ color: '#555', fontSize: '0.9rem' }}>Receive actionable feedback on your responses and track your improvement.</p>
          </div>

        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button className="glass-button" onClick={() => navigate('/register')} style={{ padding: '15px 40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Get Started
        </button>
        <button className="glass-button" onClick={() => navigate('/login')} style={{ padding: '15px 40px', fontSize: '1.2rem', background: 'rgba(255, 255, 255, 0.6)', color: '#333' }}>
          Sign In
        </button>
      </motion.div>
    </div>
  );
}
