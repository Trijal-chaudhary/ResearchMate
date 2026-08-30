import React, { useState } from "react";
import "./Chatting.css";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  sources?: string[];
}

const Chatting = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! Your research papers are ready. Ask me anything about the documents you've uploaded.",
    },
  ]);

  // These will eventually come from the uploaded PDFs
  const uploadedFiles = [
    "1. ServerCreation with express.pdf",
    "4. Middlewere.pdf",
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
    };

    setMessages((previous) => [...previous, userMessage]);

    setInput("");

    /*
      Later, you will call your FastAPI backend here.

      Example:

      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: input,
          }),
        }
      );

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          type: "assistant",
          content: data.answer,
          sources: data.sources,
        },
      ]);
    */

    // Temporary response
    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          type: "assistant",
          content:
            "I'm currently connected to the interface. Once the RAG API is connected, I will retrieve the relevant information from your research papers and generate an answer.",
          sources: ["Research papers"],
        },
      ]);
    }, 700);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <div className="logo-mark">R</div>

          <div>
            <h2>ResearchMate</h2>
            <span>Research workspace</span>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="section-title">
            <span>Your Papers</span>
            <span className="paper-count">{uploadedFiles.length}</span>
          </div>

          <div className="paper-list">
            {uploadedFiles.map((file, index) => (
              <div className="paper-item" key={index}>
                <div className="paper-icon">PDF</div>

                <div className="paper-info">
                  <p>{file}</p>
                  <span>Uploaded</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="new-research-button">
            <span>＋</span>
            New Research
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="chat-main">
        {/* Chat Header */}
        <header className="chat-header">
          <div>
            <h1>Research Assistant</h1>
            <p>Ask questions about your uploaded research papers</p>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            Ready
          </div>
        </header>

        {/* Messages */}
        <div className="messages-container">
          <div className="messages">
            {messages.map((message) => (
              <div className={`message-row ${message.type}`} key={message.id}>
                {message.type === "assistant" && (
                  <div className="avatar assistant-avatar">R</div>
                )}

                <div className="message-wrapper">
                  <div className="message-label">
                    {message.type === "assistant" ? "ResearchMate" : "You"}
                  </div>

                  <div className="message-bubble">{message.content}</div>

                  {message.sources && message.sources.length > 0 && (
                    <div className="sources">
                      <div className="sources-title">Sources</div>

                      {message.sources.map((source, index) => (
                        <div className="source-item" key={index}>
                          <span className="source-icon">↗</span>

                          {source}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="avatar user-avatar">Y</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about your research..."
              rows={1}
            />

            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              ↑
            </button>
          </div>

          <p className="input-hint">
            Press <strong>Enter</strong> to send ·{" "}
            <strong>Shift + Enter</strong> for a new line
          </p>
        </div>
      </main>
    </div>
  );
};

export default Chatting;
