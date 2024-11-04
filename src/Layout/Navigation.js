import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, title: "Home", path: "/", image: "home.png" },
  { id: 2, title: "Projects", path: "/Projects", image: "project.png" },
  { id: 3, title: "Stack", path: "/Stack", image: "stack.png" },
  { id: 4, title: "Resume", path: "/Resume", image: "resume.png" },
  { id: 5, title: "Theme", path: "/Theme", image: "theme.png" },
  { id: 6, title: "Contact", path: "/Contact", image: "contact.png" },
];

function Next(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hover:bg-gray-600 bg-gray-600 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50`}
      style={{ ...style, display: "block", right: "0"}}
      onClick={onClick}
    />
  );
}

function Previous(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hover:bg-gray-600 bg-gray-600 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50`}
      style={{ ...style, display: "block", left: "0", zIndex: "10" }}
      onClick={onClick}
    />
  );
}

function Navigation() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [savedColors, setSavedColors] = useState([]);
  const [savedOpacity, setSavedOpacity] = useState([]);
  const [invert, setInvert] = useState([]);

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
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    speed: 500,
    nextArrow: <Next />,
    prevArrow: <Previous />,
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
    navigate(path);
  };
  return (
    <div className="slider-container overflow-x-hidden h-40">
      <Slider ref={sliderRef} {...settings}>
        {menuItems.map((item) => {
          const primaryColor = savedColors[0] || "#e6e1d7";
          const secondaryColor = savedColors[1] || "#0d1119";
          const accentColor = savedColors[2] || "#a48c58";
          
          return (
            <div key={item.id} className="p-4 flex justify-center">
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
