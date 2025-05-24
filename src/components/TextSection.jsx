import { useState } from "react";
import PropTypes from "prop-types";
import OpenAI from 'openai';




const TextSection = ({ mode, showAlert }) => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const summarizeText = async (text, apiKey) => {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_API_KEY,
      dangerouslyAllowBrowser: true // Only for frontend demo (use backend in production)
    });
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful text summarizer. Summarize the following text in 1-2 sentences:" 
          },
          { 
            role: "user", 
            content: text 
          }
        ],
        temperature: 0.7
      });
  
      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI Error:", error);
      return "Error generating summary";
    }
  };
  
  const handleSummarize = async () => {
    if (!text) return;
    
    setIsSummarizing(true);
    props.showAlert("Generating AI summary...", "info");
    
    const result = await summarizeText(text, "YOUR_API_KEY");
    setSummary(result);
    
    setIsSummarizing(false);
    props.showAlert("Summary generated!", "success");
  };

  const handleText = (evt) => {
    setText(evt.target.value);
  };

  const handleUpText = () => {
    const newText = text.toUpperCase();
    setText(newText);
    showAlert("Text converted to Uppercase!", "success");
  };

  const handleSpace = () => {
    const newText = text.replace(/\s+/g, " ");
    setText(newText);
    showAlert("Unnecessary Spaces Removed!", "success");
  };

  const handleClear = () => {
    setText("");
    showAlert("Text Cleared!", "success");
  };

  const handleDownText = () => {
    const newText = text.toLowerCase();
    setText(newText);
    showAlert("Text converted to Lowercase!", "success");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    showAlert("Copied to Clipboard!", "success");
  };

  const wordCount = text.split(/\s+/).filter((element) => {
    return element.length !== 0;
  }).length;

  return (
    <>
      <div
        className="container"
        style={{ color: mode === "dark" ? "white" : "black" }}
      >
        <div className="mb-3">
          <h2 className="text-center mt-5">
            Try TextUtils - Word Counter, Character Counter And More...
          </h2>
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            placeholder="Enter the text here"
            value={text}
            onChange={handleText}
            style={{
              backgroundColor: mode === "dark" ? "#c9c6c6" : "white",
              color: mode === "dark" ? "#201f1f" : "black",
            }}
          />
          <div className="button-group">
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleUpText}
            >
              Convert to Uppercase
            </button>
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleDownText}
            >
              Convert to Lowercase
            </button>
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleSpace}
            >
              Remove extra spaces
            </button>
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleCopyText}
            >
              Copy Text
            </button>
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              disabled={text.length === 0}
              type="button"
              className="btn mx-4 my-3"
              style={{
                backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                color: mode === "light" ? "white" : "black",
                fontWeight: 450,
              }}
              onClick={handleSummary}
            >
              Summarize
            </button>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{ color: mode === "dark" ? "white" : "black" }}
      >
        <h3 className="mx-2 my-3">Text Summary</h3>
        <p className="mx-2 my-3">
          {wordCount} Words <br />
          {text.length} Characters
        </p>
      </div>

      <div className="container mt-4">
  <h3>AI Summary</h3>
  {isSummarizing ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="p-3 bg-light rounded">
      {summary || "No summary generated yet"}
    </div>
  )}
</div>

    </>
  );
};

TextSection.propTypes = {
  mode: PropTypes.string.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default TextSection;