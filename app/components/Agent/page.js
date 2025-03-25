"use client";
import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, MessageCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Function to send a message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Clear input immediately

    try {
      // Call API to get AI response
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = { text: data.response || "AI response error", sender: "ai" };


      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch AI response.", sender: "ai" }]);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4  bg-gradient-to-br from-gray-150 to-gray-300 dark:from-gray-900 dark:to-black  text-gray-900 dark:text-gray-100">
      {!showChat && (
        <Button
          onClick={() => setShowChat(true)}
          className="flex items-center gap-2 border-2 border-black dark:border-blue-500 text-white p-3 rounded-full shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 text-black dark:text-white" />
          <p className="text-black dark:text-white">Chat</p>
        </Button>
      )}

      {showChat && (
        <div className="fixed bottom-16 right-4 w-80 border rounded-lg shadow-lg bg-white dark:bg-gray-900">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b p-3 bg-gray-200 dark:bg-gray-800">
            <h2 className="text-lg font-bold">AI Chatbot</h2>
            <Button
              onClick={() => setShowChat(false)}
              variant="ghost"
              className="text-gray-600 dark:text-gray-300"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto space-y-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Invisible div for auto-scroll */}
          </div>

          {/* Chat Input */}
          <div className="p-3 flex gap-2 border-t bg-gray-200 dark:bg-gray-800">
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} className="bg-blue-500 text-white" aria-label="Send message">
              <SendHorizontal />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
