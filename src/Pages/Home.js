import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    const textElements = gsap.utils.toArray(".text");
    textElements.forEach((text) => {
      gsap.to(text, {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "center 80%",
          end: "center 20%",
          scrub: true,
        },
      });
    });

    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem('themeData')) || {};
      setSavedColors(savedData.colors || []);
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

  const [savedColors, setSavedColors] = useState([]);


  return (
    <>
      <div className="md:flex justify-center w-full mb-4 md:mb-0">
        <div>
          <div className="flex justify-center">
            <div className="w-auto">
              <p className="text-xl lg:text-3xl 2xl:text-4xl">
                NIVED<span className="opacity-40">LAL PRAKASH</span>
              </p>
              <p className="text-6xl lg:text-9xl 2xl:text-[10rem]">PORTFOLIO</p>
              <p className="text-end text-xl lg:text-3xl 2xl:text-4xl">WEB DEVELOPER</p>
            </div>
          </div>
          <div className="lg:text-xl 2xl:text-2xl text-center">
          <p className="mt-10 2xl:mt-12">
            Welcome to my <span className="curly"  style={{ color: savedColors[1] }}>digital</span> playground! I'm a Software Engineer from
            India.
          </p>
          <p>
            I merge technology with creativity to craft <span className="curly"  style={{ color: savedColors[1] }}>immersive</span> web
            experiences.
          </p>
          <p>
            I strive to create unique <span className="curly"  style={{ color: savedColors[1] }}>solutions</span> that looks great & function seamlessly.
          </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
