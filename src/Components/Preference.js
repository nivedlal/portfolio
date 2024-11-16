import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Preference = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [savedColors, setSavedColors] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0, y: -100 },
        { opacity: 1, scale: 1, duration: 1, ease: "bounce.out", y: 0}
      );
    }
  }, [isModalOpen]);

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

  const handleConfirm = () => {
    setIsConfirm(true);
  };

  const handleClearLocalStorage = () => {
    if (isConfirm) {
      localStorage.clear();
      setIsModalOpen(false);
      setIsConfirm(false);
      window.location.reload();
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsConfirm(false);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setIsConfirm(false);
    }
  };

  return (
    <div>
      <svg
        onClick={toggleModal}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 absolute z-50 top-2 right-2 cursor-pointer transition-all duration-500 hover:animate-spin"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-70"
        >
          <div className="relative w-full max-w-md max-h-full p-4" ref={modalRef}>
            <div className="rounded-lg shadow bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
              {!isConfirm ? (
                <div className="p-4 md:p-5">
                <p className="text-sm" style={{ color: savedColors[1] }}>Preferences</p>
                <ul className="my-4 space-y-3">
                    <li className="cursor-pointer">
                        <a onClick={handleConfirm} className="flex items-center p-3 font-bold rounded-lg group hover:shadow" style={{ background:savedColors[0], color: savedColors[2] }}>
                            <span className="flex-1 whitespace-nowrap">Clear local storage</span>
                            <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 font-medium rounded" style={{ background:savedColors[2], color: savedColors[1] }}>{">"}</span>
                        </a>
                    </li>
                </ul>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <svg
                    className="mx-auto mb-4 w-12 h-12"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg">
                    Are you sure you want to clear all saved data from local
                    storage?
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleClearLocalStorage}
                      type="button"
                      className="glitch-button text-white bg-red-700 hover:bg-red-500 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Go for it
                    </button>
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-white border border-green-700 hover:bg-green-500 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Never mind
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preference;
