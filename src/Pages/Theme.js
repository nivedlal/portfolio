import React, { useCallback, useState } from "react";

function Theme() {
  const themes = [
    {
      name: "Aurum",
      colors: ["#e6e1d7", "#a48c58", "#0d1119"],
      opacity: 50,
      bg: "bg_1.png",
      invert: "",
      resume: "aurum.png"
    },
    {
      name: "Arcane",
      colors: ["#f3f2f3", "#ff4747", "#151515"],
      opacity: 50,
      bg: "bg_2.jpg",
      invert: "",
      resume: "arcane.png"
    },
    {
      name: "Tropical",
      colors: ["#c4f750", "#5ad4d4", "#222430"],
      opacity: 75,
      bg: "bg_3.jpeg",
      invert: "",
      resume: "tropical.png"
    },
    {
      name: "Enigma",
      colors: ["#8a4fff", "#29ffc9", "#1c113f"],
      opacity: 75,
      bg: "bg_4.png",
      invert: "invert",
      resume: "enigma.png"
    },
  ];

  const [selectedThemeIndex, setSelectedThemeIndex] = useState(() => {
    const savedTheme = localStorage.getItem("themeData");
    if (savedTheme) {
      return themes.findIndex(theme => theme.name === JSON.parse(savedTheme).name);
    }
    return null;
  });

  const handleClick = useCallback(
    (index) => {
      const selectedThemeData = themes[index];
      setSelectedThemeIndex(index);
      try {
        localStorage.setItem("themeData", JSON.stringify(selectedThemeData));
        localStorage.setItem("selectedTheme", selectedThemeData.name);
        const event = new Event("themeChange");
        window.dispatchEvent(event);
      } catch (error) {
        console.error("Error saving data to local storage:", error);
      }
    },
    [themes]
  );

  return (
    <div className="grid grid-cols-2 md:flex justify-between gap-8 overflow-y-auto h-96 2xl:h-[35rem] m-4">
      {themes.map((theme, index) => (
        <div
          key={index}
          className="md:w-1/4 flex justify-center md:justify-end gap-2 relative h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
          onClick={() => handleClick(index)}
        >
          <img
            src={theme.bg}
            alt={`Hero ${index + 1}`}
            className={`w-auto cursor-pointer ${selectedThemeIndex === index ? "filter grayscale blur-sm" : ""}`}
          />
          <div className="absolute inset-0 bg-black opacity-50 cursor-pointer" />
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold uppercase cursor-pointer">
            {selectedThemeIndex === index ? <p style={{ color: theme.colors[1] }}>Selected</p> : theme.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Theme;