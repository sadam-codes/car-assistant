import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Chatbot from "./component/Chatbot";
import CarForm from "./component/CarForm";
import Home from "./component/Home";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-2">
          <Routes>
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/add-car" element={<CarForm />} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
