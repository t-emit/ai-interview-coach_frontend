import { useState } from "react";
import API from "../api";

function QuestionBox({ role }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const getQuestion = async () => {
    const res = await API.post("/generate-question", { role });
    setQuestion(res.data.question);
  };

  const submitAnswer = async () => {
    const res = await API.post("/evaluate", {
      question,
      answer
    });
    setFeedback(res.data.feedback);
  };

  return (
    <div>
      <button onClick={getQuestion}>Get Question</button>
      <p>{question}</p>

      <textarea onChange={(e) => setAnswer(e.target.value)} />

      <button onClick={submitAnswer}>Submit</button>

      <p>{feedback}</p>
    </div>
  );
}

export default QuestionBox;