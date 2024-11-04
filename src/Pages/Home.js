import React, { useEffect } from "react";
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
  }, []);

  return (
    <>
      <div className="md:flex flex-row-reverse justify-between gap-4 w-full overflow-y-auto h-[28rem] md:h-auto mb-4 md:mb-0">
      <div className="md:w-1/3 flex">
          <img src="HeroImage2.png" alt="Profile Picture" />
        </div>
        <div className="md:w-4/6 flex flex-col justify-center xl:text-2xl 2xl:text-4xl">
          <div className="bg-gray-400 py-2 px-4 m-1 md:m-2 bg-opacity-30 hover-text uppercase w-fit cursor-default italic font-bold ">
            HELLO
            <span className="w-full bg-gray-400 p-2 hover-span">HOWDY</span>
          </div>
          <div className="p-1 md:p-2">
            <p className="text-2xl uppercase xl:text-5xl 2xl:text-6xl md:mb-2 tracking-wide">
              I'M NIVED
            </p>
            <p className="md:my-2">
              Welcome to my digital playground! I'm a Software Engineer from
              India. I merge technology with creativity to craft immersive
              web experiences.
            </p>
            <p className="opacity-50">
              With a passion for design, coding, and user interaction, I strive
              to create unique solutions that not only look great but also
              function seamlessly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
