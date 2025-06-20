import React, { useEffect, useState, useRef } from "react";
import { IoSendOutline } from "react-icons/io5";
import axios from "axios";
import { marked } from "marked";

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            content: marked("Hello.. I'm listening! Go on.."),
            time: new Date().toLocaleTimeString(),
        },
    ]);
    const chatRef = useRef(null);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            content: marked.parse(message),
            time: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:4000/api/chat", { message });
            const botMessage = {
                sender: "bot",
                content: marked.parse(res.data.response),
                time: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Chat error", err);
        }
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        const [hourStr, minuteStr] = timeStr.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minuteStr} ${ampm}`;
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="max-w-md mx-auto bg-white border rounded-lg shadow-lg h-[497px] flex flex-col overflow-hidden p-0 m-0">
            <div className="bg-black text-white text-xl font-extrabold px-4 py-3">
                Chatter box!
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-center gap-1 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>

                        {msg.sender === "bot" && (
                            <img src="/images/chatbot.jpeg" alt="Bot Avatar" className="w-7 h-7 rounded-full" />
                        )}

                        <div>
                            <div className={`
                                px-4 py-2 rounded-[20px] max-w-xs text-sm 
                                ${msg.sender === "user"
                                    ? "bg-black text-white rounded-br-none"
                                    : "bg-white text-gray-900 border rounded-bl-none shadow"
                                }
                            `}>
                                <div
                                    className="text-sm whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: msg.content }}
                                />
                            </div>
                            <div className={`text-[10px] text-gray-400 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                {formatTime(msg.time)}
                            </div>
                        </div>

                        {msg.sender === "user" && (
                            <img src="/images/human.jpg" alt="User Avatar" className="w-7 h-7 rounded-full" />
                        )}
                    </div>
                ))}
                <div ref={chatRef}></div>
            </div>

            <div className="border-t px-3 py-2 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 text-sm outline-none border-b border-gray-400 py-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="text-black text-2xl"
                >
                    <IoSendOutline />
                </button>
            </div>
        </div>
    );
};
export default Chatbot;
