import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            content: message,
            time: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:4000/api/chat", { message });
            const botMessage = {
                sender: "bot",
                content: res.data.response,
                time: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Chat error", err);
        }
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="max-w-sm border rounded-xl flex flex-col h-[530px] bg-white overflow-hidden">
            <div className="bg-black text-white text-lg font-semibold py-3 px-4 text-center">
                Car Assistant
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-2xl shadow ${msg.sender === "user"
                                ? "bg-black text-white rounded-br-none"
                                : "bg-white text-gray-900 rounded-bl-none"}`}
                        >
                            <p className="text-sm whitespace-pre-line">{msg.content}</p>

                            <div className="text-xs text-gray-300 text-right mt-1">
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={chatRef} />
            </div>

            <div className="p-3 border-t flex items-center bg-white gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-black text-white px-4 py-2 rounded-full"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
