import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Target, MessageSquare, Sparkles, Upload, Mic, PlayCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormattedResponse from "../components/FormattedResponse";
import "../App.css";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const [role, setRole] = useState("Software Engineer");
  const [category, setCategory] = useState("Technical");
  const [resume, setResume] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [expertAnswer, setExpertAnswer] = useState("");
  const [level, setLevel] = useState("medium");
  const [score, setScore] = useState(0);

  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [loadingExpert, setLoadingExpert] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef(null);

  // Setup interceptor to send token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    API.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const analyzeResume = async () => {
    if (!resume.trim()) return;
    setLoadingAnalysis(true);
    try {
      const res = await API.post("/api/analyze-resume", { text: resume, role });
      setAnalysis(res.data.analysis);
    } catch(e) {
      console.error(e);
      setAnalysis("Error communicating with backend.");
    }
    setLoadingAnalysis(false);
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoadingAnalysis(true);
      const res = await API.post("/api/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResume(res.data.text);
    } catch (e) {
      console.error(e);
      alert("Error extracting PDF.");
    }
    setLoadingAnalysis(false);
  };

  const getQuestion = async () => {
    setLoadingQuestion(true);
    setExpertAnswer("");
    try {
      const res = await API.post("/api/generate-question", { level, role, category });
      setQuestion(res.data.question);
    } catch(e) {
      console.error(e);
      setQuestion("Error communicating with backend.");
    }
    setLoadingQuestion(false);
  };

  const getExpertAnswerFn = async () => {
    if (!question) return;
    setLoadingExpert(true);
    try {
      const res = await API.post("/api/expert-answer", { question, role });
      setExpertAnswer(res.data.answer);
    } catch(e) {
      console.error(e);
      setExpertAnswer("Error fetching expert answer.");
    }
    setLoadingExpert(false);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer(prev => prev + (prev ? " " : "") + transcript);
    };
    recognition.start();
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoadingFeedback(true);
    setScore(0);
    try {
      const res = await API.post("/api/evaluate", { answer, role });
      const returnedFeedback = res.data.feedback;
      setFeedback(returnedFeedback);
      
      // Parse out the score explicitly
      const match = returnedFeedback.match(/Score:\s*(\d+)/i);
      if (match && match[1]) {
        setScore(parseInt(match[1], 10));
      }
    } catch(e) {
      console.error(e);
      setFeedback("Error communicating with backend.");
    }
    setLoadingFeedback(false);
  };

  return (
    <div className="app-container" style={{ paddingBottom: '40px' }}>
      <div style={{ textAlign: "center", padding: "40px 0 10px 0", position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, right: 40, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontWeight: '600', color: '#6a5cff', fontSize: '16px' }}>Hi, {userName}</span>
          <button onClick={() => navigate("/about")} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', fontSize: '15px', fontWeight: '500', padding: 0 }}>
            About
          </button>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
        <h1 style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', color: '#2c3e50', fontSize: '3em', fontWeight: '800', margin: 0 }}>
          <Sparkles size={40} color="#6a5cff" /> 
          AI Interview Coach 
          <Sparkles size={40} color="#00c6ff" />
        </h1>
        <p style={{ color: '#666', fontSize: '1.2em', marginTop: '10px' }}>Dashboard</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="glass-card" style={{ marginBottom: '20px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
          <Target className="icon" color="#f12711" /> What role are you interviewing for?
        </h3>
        <input 
          type="text" 
          className="glass-textarea" 
          style={{ minHeight: '45px', marginBottom: 0, height: '45px' }} 
          placeholder="e.g. Frontend Developer, Product Manager, Data Scientist..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
          <FileText className="icon" color="#6a5cff" /> Paste or Upload Resume 📄
        </h3>
        <textarea
          className="glass-textarea"
          placeholder="Paste your resume here, or click to upload PDF..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="glass-button" onClick={analyzeResume} disabled={loadingAnalysis || !resume.trim()}>
            <Sparkles size={18} /> {loadingAnalysis ? "Analyzing..." : "Analyze Resume"}
          </button>
          <input type="file" accept="application/pdf" style={{ display: 'none' }} ref={fileInputRef} onChange={handlePDFUpload} />
          <button className="glass-button" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }} onClick={() => fileInputRef.current.click()}>
            <Upload size={18} /> Upload PDF
          </button>
        </div>
        {analysis && <FormattedResponse content={analysis} />}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
          <Target className="icon" color="#e73c7e" /> Generate 10 Questions
        </h3>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div 
            onClick={() => setCategory("Technical")}
            style={{ flex: 1, padding: '15px', border: category === 'Technical' ? '2px solid #6a5cff' : '2px solid transparent', borderRadius: '10px', background: 'rgba(255,255,255,0.5)', cursor: 'pointer', textAlign: 'center', transition: '0.2s', boxShadow: category === 'Technical' ? '0 4px 12px rgba(106, 92, 255, 0.2)' : 'none' }}>
            <h4 style={{ margin: 0, color: '#2c3e50' }}>🖥️ Technical</h4>
          </div>
          <div 
            onClick={() => setCategory("HR")}
            style={{ flex: 1, padding: '15px', border: category === 'HR' ? '2px solid #e73c7e' : '2px solid transparent', borderRadius: '10px', background: 'rgba(255,255,255,0.5)', cursor: 'pointer', textAlign: 'center', transition: '0.2s', boxShadow: category === 'HR' ? '0 4px 12px rgba(231, 60, 126, 0.2)' : 'none' }}>
            <h4 style={{ margin: 0, color: '#2c3e50' }}>🤝 HR / Behavioral</h4>
          </div>
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#555" }}>Select Difficulty Level:</label>
          <select
            className="glass-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="easy">🟩 Easy</option>
            <option value="medium">🟨 Medium</option>
            <option value="hard">🟥 Hard</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="glass-button" onClick={getQuestion} disabled={loadingQuestion}>
            <Target size={18} /> {loadingQuestion ? "Generating..." : `Get 10 ${category} Questions`}
            </button>
            
            {question && (
                <button className="glass-button" style={{ background: 'linear-gradient(135deg, #f12711, #f5af19)' }} onClick={getExpertAnswerFn} disabled={loadingExpert}>
                <PlayCircle size={18} /> {loadingExpert ? "Gathering Answers..." : "Get Expert Answers"}
                </button>
            )}
        </div>

        {question && <FormattedResponse content={question} />}
        {expertAnswer && (
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,165,0,0.1)', borderLeft: '4px solid orange', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ff8c00' }}>Expert Answer 💡</h4>
                <FormattedResponse content={expertAnswer} />
            </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '15px', marginTop: 0 }}>
          <MessageSquare className="icon" color="#00c6ff" /> Your Answer (Voice Mode 🎤)
        </h3>
        <textarea
          className="glass-textarea"
          placeholder="Type your answer or use voice recording..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
            <button className="glass-button" onClick={submitAnswer} disabled={loadingFeedback || !answer.trim()}>
            <MessageSquare size={18} /> {loadingFeedback ? "Submitting..." : "Submit Answer"}
            </button>

            <button className={`glass-button ${isListening ? 'listening' : ''}`} style={{ background: isListening ? '#ff4b2b' : 'linear-gradient(135deg, #2193b0, #6dd5ed)' }} onClick={startListening}>
                <Mic size={18} /> {isListening ? "Listening..." : "Record Audio"}
            </button>
        </div>

        {score > 0 && (
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 'bold' }}>
                    <span>Performance Score 📊</span>
                    <span>{score} / 10</span>
                </div>
                <div style={{ width: '100%', background: 'rgba(0,0,0,0.1)', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${score * 10}%` }} 
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${score < 5 ? '#ff4b2b' : score < 8 ? '#f5af19' : '#00b09b'}, #96c93d)` }} 
                    />
                </div>
            </div>
        )}

        {feedback && <FormattedResponse content={feedback} />}
      </motion.div>

      {/* Footer Section */}
      <footer style={{ marginTop: '50px', padding: '30px 20px', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center', color: '#555' }}>
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
