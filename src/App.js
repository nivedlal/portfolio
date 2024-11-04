import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Layout/Navigation";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Stack from "./Pages/Stack";
import Resume from "./Pages/Resume";
import Theme from "./Pages/Theme";
import Contact from "./Pages/Contact";
import { useState, useEffect } from "react";

function App() {
  const [savedBg, setSavedBg] = useState([]);

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem('themeData')) || {};
      const bg = savedData.bg || "bg_1.png";
      setSavedBg(bg);
    };
    
    updateSavedColors();
    const handleThemeChange = () => {
      updateSavedColors();
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <div className="relative h-dvh flex flex-col px-6 py-4">
      <div
        className="absolute inset-0 bg-center bg-cover blur-sm"
        style={{ backgroundImage: `url(${savedBg})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        className="absolute inset-0 bg-center bg-cover hidden"
        style={{ backgroundImage: "url('overlay.png')" }}
      />
      <div className="flex flex-[9] items-center relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div className="flex-[1] relative z-10">
        <Navigation />
      </div>
      <div className="cursor"></div>
    </div>
  );
}

export default App;
