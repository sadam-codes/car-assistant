import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaCar, FaPlusCircle } from "react-icons/fa";

const Home = () => {
    return (
        <div className="fixed left-0 top-0 w-full bg-black"> {/* Added to shift content right of sidebar */}
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
                        Welcome to <span className="text-yellow-400">ChatCar Insight</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Your AI-powered assistant for all car-related inquiries. Buy, sell, or chat about cars seamlessly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
                    <Link
                        to="/chatbot"
                        className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                    >
                        <FaRobot className="text-4xl text-yellow-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Chat with Bot</h3>
                        <p className="text-gray-400">
                            Get answers, recommendations, and support through our AI chatbot.
                        </p>
                    </Link>
                    <Link
                        to="/add-car"
                        className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                    >
                        <FaPlusCircle className="text-4xl text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Add Your Car</h3>
                        <p className="text-gray-400">
                            Post your car for sale and let others explore your listing.
                        </p>
                    </Link>
                </div>

                <footer className="mt-16 text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} ChatCar Insight. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default Home;
