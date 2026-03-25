import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io();

export default function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.on("welcome", (data) => {
      setUsername(data.username);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("user-count", (data) => {
      setOnlineCount(data.count);
    });

    socket.on("typing", (data) => {
      setTypingUser(data.username);
    });

    socket.on("stop-typing", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("welcome");
      socket.off("message");
      socket.off("user-count");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleInputChange(e) {
    setInput(e.target.value);
    socket.emit("typing");

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    // Stop typing after 1.5 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing");
    }, 1500);
  }

  function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    socket.emit("message", { text });
    socket.emit("stop-typing");
    setInput("");
  }

  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Realtime Chat</h1>
        <div className="status">
          <span className="online-badge">{onlineCount} online</span>
          {username && <span className="username">You: {username}</span>}
        </div>
      </header>

      <div className="messages">
        {messages.length === 0 && (
          <div className="empty-state">
            No messages yet. Say something!
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === "system" ? "system" : ""} ${msg.sender === username ? "own" : ""}`}
          >
            {msg.sender === "system" ? (
              <div className="system-text">{msg.text}</div>
            ) : (
              <>
                <div className="message-header">
                  <span className="sender">{msg.sender}</span>
                  <span className="time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="text">{msg.text}</div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {typingUser && (
        <div className="typing-indicator">{typingUser} is typing...</div>
      )}

      <form className="input-bar" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          autoFocus
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
