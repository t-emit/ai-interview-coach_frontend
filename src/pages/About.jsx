import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Target, Rocket, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ minHeight: '100vh', padding: '40px 20px', paddingBottom: '80px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontWeight: 'bold', marginBottom: '30px', padding: '10px', borderRadius: '8px', transition: '0.2s' }}
        className="glass-button"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div style={{ textAlign: "center", marginBottom: '50px' }}>
        <h1 style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', color: '#2c3e50', fontSize: '3em', fontWeight: '800', margin: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Sparkles size={40} color="#6a5cff" /> 
          About AI Interview Coach 
          <Sparkles size={40} color="#00c6ff" />
        </h1>
        <p style={{ color: '#666', fontSize: '1.2em', marginTop: '15px' }}>Empowering your career journey with Artificial Intelligence</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
            <Target className="icon" color="#6a5cff" /> Our Mission
          </h3>
          <p style={{ lineHeight: '1.7', color: '#444', fontSize: '1.05em' }}>
            The AI Interview Coach was built to democratize interview preparation. We believe that everyone deserves realistic, targeted, and instant feedback to perform their best when it matters most. By leveraging advanced generative AI models, we analyze your resume and evaluate your answers just like a real hiring manager would.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
            <Rocket className="icon" color="#00c6ff" /> Future Extraction & Roadmap
          </h3>
          <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '20px', fontSize: '1.05em' }}>
            <li><strong>Mock Video Interviews:</strong> Analyzing facial expressions, body language, and tone of voice.</li>
            <li><strong>Real-time Code Execution:</strong> An interactive IDE to solve DSA and system design problems live.</li>
            <li><strong>Automated Job Matching:</strong> Suggesting perfectly suited roles based on transcript evaluations.</li>
            <li><strong>Advanced Analytics:</strong> Detailed progress tracking and personalized study schedules.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
            <Heart className="icon" color="#e73c7e" /> How You Can Support Us
          </h3>
          <p style={{ lineHeight: '1.7', color: '#444', fontSize: '1.05em' }}>
            Building high-quality, free AI tools takes a lot of time and resources. If you've found this platform helpful, here is how you can support our future goals:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '20px', fontSize: '1.05em' }}>
            <li>⭐ <strong>Star the GitHub Repository:</strong> This helps others discover the project.</li>
            <li>💬 <strong>Share Feedback:</strong> Reach out with bug reports or feature requests via our support email.</li>
            <li>🤝 <strong>Contribute:</strong> Submit pull requests for new integrations or UI enhancements.</li>
            <li>🚀 <strong>Tell a Friend:</strong> Share the tool with classmates, colleagues, or anyone actively job hunting!</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer style={{ marginTop: '80px', padding: '30px 20px', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center', color: '#555', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <a href="https://github.com/t-emit" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>🐙 GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" style={footerLinkStyle}>💼 LinkedIn</a>
          <a href="mailto:talatsiddiqui028@gmail.com" style={footerLinkStyle}>✉️ Email Support</a>
        </div>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Need help? Reach out and email us at <a href="mailto:talatsiddiqui028@gmail.com" style={{ color: '#6a5cff', textDecoration: 'none', fontWeight: 'bold' }}>Team_AI_Coach@gmail.com</a></p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>&copy; {new Date().getFullYear()} AI Interview Coach. All rights reserved.</p>
      </footer>
    </div>
  );
}

const footerLinkStyle = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  transition: 'color 0.2s',
  fontSize: '15px'
};
