import { useState } from "react";

function UploadResume({ setRole }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        placeholder="Enter role (e.g. ML Engineer)"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setRole(input)}>Start</button>
    </div>
  );
}

export default UploadResume;