import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Reference to track the bottom of the chat

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Runs when messages update

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Format timestamp to remove seconds
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: formattedTime,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "Hello, I am your chat assistant. How are you feeling?",
        timestamp: formattedTime,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        S.E.R.E.N.A
      </div>
      <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          <p className={message.sender === "user" ? "gradient-text semi-bold" : ""}>
            {message.text}
          </p>
          <small>{message.timestamp}</small>
        </div>
      ))}
        {/* Invisible div to ensure scrolling */}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Share your thoughts ..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;