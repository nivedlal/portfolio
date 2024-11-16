import React, { useEffect, useState, useRef } from "react";
import Terminal from "./Terminal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Ribbon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedColors, setSavedColors] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem("themeData")) || {};
      setSavedColors(savedData.colors || ["#e6e1d7", "#a48c58", "#0d1119"]);
    };

    updateSavedColors();
    const handleThemeChange = () => {
      updateSavedColors();
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.5, x: 400 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1,0.3)", x: 0}
      );
    }
  }, [isModalOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        className="hidden md:block absolute z-50 top-[45%] right-0 opacity-75 hover:opacity-100 cursor-pointer"
        style={{ transform: "translateY(-50%)" }}
        onClick={toggleModal}
      >
        <svg width="40" height="140">
          <path fill={`${savedColors[2]}`} d="M0 0h53.08v171.358H0z"></path>
          <g fill={`${savedColors[0]}`}>
            <text
              x="50%"
              y="50%"
              className="tracking-widest font-semibold"
              textAnchor="middle"
              alignmentBaseline="middle"
              transform="rotate(-90 22 70)"
            >
              Terminal
            </text>
          </g>
        </svg>
      </div>
      <div
        className="md:hidden absolute z-50 bottom-1 right-0 opacity-75 hover:opacity-100 cursor-pointer"
        onClick={toggleModal}
      >
        <svg width="140" height="40">
          <path fill={`${savedColors[2]}`} d="M0 0h200v40H0z"></path>
          <g fill={`${savedColors[0]}`}>
            <text
              x="50%"
              y="50%"
              fontSize="14"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="tracking-widest font-bold"
            >
              Terminal
            </text>
          </g>
        </svg>
      </div>
      {isModalOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden bg-gray-600 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm"
        >
          <div ref={modalRef} className="w-full me-8 sm:me-0">
            <Terminal closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

export default Ribbon;
