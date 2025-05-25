import { useState } from "react";
import PropTypes from "prop-types";
import OpenAI from 'openai';

const TextSection = ({ mode, showAlert }) => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
const [isSummaryCopied, setIsSummaryCopied] = useState(false);

  const summarizeText = async (text) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/pegasus-xsum",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: `Summarize the following text to 50% while preserving key points:\n\n${text}` }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result[0]?.summary_text || "No summary generated";
    } catch (error) {
      console.error("Hugging Face Error:", error);
      return "Error generating summary: " + error.message;
    }
  };
  
  const handleSummarize = async () => {
    if (!text.trim()) {
      showAlert("Please enter text to summarize", "warning");
      return;
    }
  
    setIsSummarizing(true);
    showAlert("Generating AI summary...", "info");
  
    try {
      const result = await summarizeText(text);
      setAiSummary(result);
      showAlert("Summary generated!", "success");
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to generate summary", "danger");
      setAiSummary("Error: Could not generate summary");
    } finally {
      setIsSummarizing(false);
    }
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


    // New handler functions
const handleCopyAiSummary = () => {
  navigator.clipboard.writeText(aiSummary);
  setIsSummaryCopied(true);
  showAlert("AI summary copied!", "success");
  setTimeout(() => setIsSummaryCopied(false), 2000);
};

const handleClearAiSummary = () => {
  setAiSummary("");
  showAlert("AI summary cleared!", "info");
};

// Calculate AI summary stats
const aiWordCount = aiSummary 
  ? aiSummary.split(/\s+/).filter(word => word.length > 0).length
  : 0;


    return (
      <>
        <div className="container" style={{ color: mode === "dark" ? "white" : "black" }}>
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
                disabled={text.length === 0 || isSummarizing}
                type="button"
                className="btn mx-4 my-3"
                style={{
                  backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
                  color: mode === "light" ? "white" : "black",
                  fontWeight: 450,
                }}
                onClick={handleSummarize}
              >
                {isSummarizing ? "Summarizing..." : "Summarize"}
              </button>
            </div>
          </div>
        </div>
    
        <div className="container" style={{ color: mode === "dark" ? "white" : "black" }}>
          <h3 className="mx-2 my-3">Text Summary</h3>
          <p className="mx-2 my-3">
            {wordCount} Words <br />
            {text.length} Characters
          </p>
        </div>
    
        {aiSummary && (
  <div className="container mt-4" style={{ color: mode === "dark" ? "white" : "black" }}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h3>AI Summary</h3>
      <div>
        <button
          onClick={handleCopyAiSummary}
          className="btn btn-sm mx-1"
          style={{
            backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
            color: mode === "light" ? "white" : "black",
          }}
        >
          {isSummaryCopied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleClearAiSummary}
          className="btn btn-sm mx-1"
          style={{
            backgroundColor: mode === "light" ? "#201f1f" : "#c9c6c6",
            color: mode === "light" ? "white" : "black",
          }}
        >
          Clear
        </button>
      </div>
    </div>

    <div className="p-3 rounded mb-3" style={{ 
      backgroundColor: mode === "dark" ? "#2a2a2a" : "#f8f9fa",
      border: `1px solid ${mode === "dark" ? "#444" : "#ddd"}`
    }}>
      {aiSummary}
    </div>

    <div className="text-muted">
      <small>
        AI Summary: {aiWordCount} words • {aiSummary.length} characters
        <br />
        Reduction: {Math.max(0, 100 - Math.round((aiSummary.length / text.length) * 100))}% shorter
      </small>
    </div>
  </div>
)}

      </>
    );
};

TextSection.propTypes = {
  mode: PropTypes.string.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default TextSection;