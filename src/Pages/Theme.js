import React, { useCallback, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    gsap.fromTo(
      ".animate",
      {
        opacity: 0,
        x: -200,        
        scale: 0.8,     
        rotation: -10,  
      },
      {
        opacity: 1,
        x: 0,           
        scale: 1,       
        rotation: 0,    
        duration: 1.2,
        ease: "power4.out", 
        stagger: 0.3,   
        delay: 0.5,     
      }
    );
  }, []);


  const [selectedThemeIndex, setSelectedThemeIndex] = useState(() => {
    const savedTheme = localStorage.getItem("themeData");
    if (savedTheme) {
      return themes.findIndex(theme => theme.name === JSON.parse(savedTheme).name);
    }
    return null;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback(
    (index) => {
      if (isTransitioning) return; 
      setIsTransitioning(true); 
      const selectedThemeData = themes[index];
      setSelectedThemeIndex(index);
      gsap.to(".theme-container", {
        opacity: 0,  
        duration: 1, 
        onComplete: () => {
          try {
            localStorage.setItem("themeData", JSON.stringify(selectedThemeData));
            localStorage.setItem("selectedTheme", selectedThemeData.name);
            const event = new Event("themeChange");
            window.dispatchEvent(event);
          } catch (error) {
            console.error("Error saving data to local storage:", error);
          }
          document.body.style.transition = "background-color 1s ease-in-out";
          document.body.style.backgroundColor = selectedThemeData.colors[2]; 
          gsap.to(".theme-container", {
            opacity: 1,
            duration: 1, 
            onComplete: () => {
              setIsTransitioning(false); 
            },
          });
        },
      });
    },
    [isTransitioning, themes]
  );

  return (
    <div className="theme-container grid grid-cols-2 md:flex justify-between gap-8 overflow-y-auto h-96 2xl:h-[35rem] m-4 overflow-x-hidden">
      {themes.map((theme, index) => (
        <div
          key={index}
          className="animate md:w-1/4 flex justify-center md:justify-end gap-2 relative h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
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