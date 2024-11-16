import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { id: 1, title: "Home", path: "/", image: "home.png" },
  { id: 2, title: "Projects", path: "/Projects", image: "project.png" },
  { id: 3, title: "Stack", path: "/Stack", image: "stack.png" },
  { id: 4, title: "Resume", path: "/Resume", image: "resume.png" },
  { id: 5, title: "Theme", path: "/Theme", image: "theme.png" },
  { id: 6, title: "Contact", path: "/Contact", image: "contact.png" },
];

function Navigation() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [savedColors, setSavedColors] = useState([]);
  const [savedOpacity, setSavedOpacity] = useState([]);
  const [invert, setInvert] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem('themeData')) || {};
      setSavedColors(savedData.colors || []);
      setSavedOpacity(savedData.opacity || []);
      setInvert(savedData.invert || []);
    };

    updateSavedColors();
    const handleThemeChange = () => {
      updateSavedColors();
      setIsTransitioning(true);
      gsap.to(".navbar", {
        opacity: 0,
        x: -1000,
        duration: 1,
        onComplete: () => {
          updateSavedColors(); 
          gsap.to(".navbar", {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power4.out", 
            onComplete: () => {
              setIsTransitioning(false);
            },
          });
        },
      });
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar",
      {
        opacity: 0,
        x: 1000, 
      },
      {
        opacity: 1,
        x: 0, 
        duration: 4, 
        ease: "power4.out", 
      }
    );
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5, 
    focusOnSelect: true,
    swipeToSlide: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleKeyDown = (event) => {
    if (sliderRef.current) {
      switch (event.key) {
        case "ArrowLeft":
          sliderRef.current.slickPrev();
          break;
        case "ArrowRight":
          sliderRef.current.slickNext();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleItemClick = (path) => {
    if (isTransitioning) return;
    navigate(path);
  };

  return (
    <div className="slider-container overflow-x-hidden h-40 navbar">
      <Slider ref={sliderRef} {...settings}>
        {menuItems.map((item) => {
          const primaryColor = savedColors[0] || "#e6e1d7";
          const secondaryColor = savedColors[1] || "#0d1119";
          const accentColor = savedColors[2] || "#a48c58";
          
          return (
            <div key={item.id} className="py-4 pe-8 flex justify-center">
              <div
                className={`relative group py-4 px-8 inline-flex items-center z-10 transition duration-500 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] cursor-pointer uppercase tracking-wider w-full text-center`}
                style={{
                  color: secondaryColor,
                  borderColor: secondaryColor,
                  backgroundColor: location.pathname === item.path ? accentColor : primaryColor,
                  boxShadow: location.pathname === item.path 
                    ? `4px 4px ${primaryColor}, 9px 9px ${secondaryColor}` 
                    : `4px 4px ${accentColor}, 9px 9px ${secondaryColor}`
                }}
                onClick={() => handleItemClick(item.path)}
              >
                <h3
                  className={`text-xl font-bold w-full z-10`}
                  style={{ color: location.pathname === item.path ? primaryColor : accentColor }}
                >
                  {item.title}
                </h3>
                <img src={item.image} alt={item.title} className={`w-8 h-8 opacity-${savedOpacity} ${invert}`} />
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.785,0.135,0.15,0.86)] scale-x-0 group-hover:scale-x-100`}
                  style={{ backgroundColor: secondaryColor }}
                ></div>
              </div>
            </div>
         );
        })}
      </Slider>
    </div>
  );
}

export default Navigation;
