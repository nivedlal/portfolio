import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [savedColors, setSavedColors] = useState([]);

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
    gsap.fromTo(
      ".animate",
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.4,
        delay: 1,
      }
    );
    gsap.fromTo(
      ".portfolio span",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 5,
        ease: "back.out(1.7)",
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <>
      <div className="md:flex w-full overflow-y-auto overflow-x-hidden h-96 2xl:h-[35rem] items-center justify-center">
        <div>
          <div className="w-full">
            <p className="text-xl lg:text-3xl 2xl:text-4xl animate ms-1 md:ms-2">
              NIVED<span className="opacity-40">LAL PRAKASH</span>
            </p>
            <span className="text-6xl lg:text-9xl 2xl:text-[10rem] portfolio md:tracking-widest">
              {"PORTFOLIO".split("").map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </span>
            <p className="text-xl lg:text-3xl 2xl:text-4xl animate me-3 md:me-4 text-right">
              WEB DEVELOPER
            </p>
          </div>
          <div className="lg:text-xl 2xl:text-2xl tracking-wider">
            <p className="mt-10 lg:mt-8 2xl:mt-10 animate">
              Welcome to my
              <span className="curly" style={{ color: savedColors[1] }}>
                digital
              </span>
              playground! I'm a Software Engineer from India.
            </p>
            <p className="animate">
              I merge technology with creativity to craft
              <span className="curly" style={{ color: savedColors[1] }}>
                immersive
              </span>
              web experiences.
            </p>
            <p className="animate">
              I strive to create unique
              <span className="curly" style={{ color: savedColors[1] }}>
                solutions
              </span>
              that looks great & function seamlessly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
