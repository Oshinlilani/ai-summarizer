import { useEffect, useState } from "react";
import axios from "axios";

function App(){
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/history").then(res => setHistory(res.data));
  }, []);

  const handleSummarize = async () => {
    const res = await axios.post("http://localhost:5000/api/summarize" , {text});
    setSummary(res.data.summary);
  };

  axios.get("/api/history").then(res => setHistory(res.data));

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await axios.post("/api/upload", FormData);
    setText(res.data.text);
  }

  return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSummarize}>Summarize</button>
      <input type="file" onChange={handleUpload} />
      <p>{summary}</p>

      <h3>History</h3>
      {history.map(item => (
        <div key={item._id}>
          <p><b>Original Text:</b> {item.originalText}</p>
          <p><b>Summary:</b> {item.summary}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}

export default App;
