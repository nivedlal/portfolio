import React, { useEffect, useState } from "react";

function Resume() {
  const pdfUrl = "resume.pdf";
  const pdfImgUrl = "resumefile.png";
  const [savedColors, setSavedColors] = useState([]);
  const [fontColors, setFontColors] = useState([]);
  const pngFrameUrl = savedColors.length > 0 ? savedColors : "aurum.png";

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem('themeData')) || {};
      setSavedColors(savedData.resume || []);
      setFontColors(savedData.colors[1] || []);
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

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = pdfUrl; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex-1 relative h-full justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={pngFrameUrl}
            alt="Frame"
            className="relative md:w-1/4"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="md:h-96 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4 border flex items-center">
              <img
                src={pdfImgUrl}
                alt="resume"
                className="z-50 w-44 md:w-64 rounded-md"
              />
            </div>
          </div>
          <button class="z-10 font-bold py-2 px-4 inline-flex items-center bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4 border "
            onClick={() => downloadImage(pngFrameUrl)}
            style={{color:`${fontColors}`}}
            >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Resume;
