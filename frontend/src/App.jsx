import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Chatbot from "./component/Chatbot";
import CarForm from "./component/CarForm";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/add-car" element={<CarForm />} />
            <Route path="/" element={<h1 className="text-xl">Welcome to Car Assistant</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
