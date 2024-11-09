import React, { useEffect, useState } from "react";

function Resume() {
  const pdfUrl = "resume.pdf";
  const pdfImgUrl = "resumefile.png";
  const [savedColors, setSavedColors] = useState([]);
  const [savedBtnColors, setSavedBtnColors] = useState([]);
  const [fontColors, setFontColors] = useState([]);
  const pngFrameUrl = savedColors.length > 0 ? savedColors : "aurum.png";

  useEffect(() => {
    const updateSavedColors = () => {
      const savedData = JSON.parse(localStorage.getItem("themeData")) || {};
      setSavedColors(savedData.resume || []);
      setSavedBtnColors(savedData.colors[1] || []);
      setFontColors(savedData.colors[2] || []);
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

  const download = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = pdfUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex-1 relative justify-center overflow-y-auto h-[28rem] md:overflow-y-hidden 2xl:h-[35rem] overflow-x-hidden">
        <div className="md:flex flex-row-reverse items-center justify-between h-full">
          <div className="relative flex justify-end md:w-1/4">
            <img src={pngFrameUrl} alt="Frame" className="relative" />
            <div className="absolute inset-0 flex items-center justify-center z-10 top-7 md:top-8 2xl:top-10">
              <div className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-4 border flex items-center relative group">
                <img
                  src={pdfImgUrl}
                  alt="resume"
                  className="z-30 w-44 md:w-32 2xl:w-64 rounded-md relative"
                />
                <div className="absolute inset-0 flex items-center justify-center z-40 opacity-0 group-hover:opacity-100">
                  <button
                    className="font-bold py-2 px-4 inline-flex items-center bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-4 border shadow-lg"
                    onClick={() => download(pdfUrl)}
                    style={{ color: `${fontColors}` }}
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <section>
            <article className="flex gap-4">
              <header className="w-1/6">
                <time datetime="2023-01-01">2023 — Present</time>
              </header>
              <div className="w-5/6">
                <h3 className="font-bold">
                  Software Engineer · Xerox Technology Services
                </h3>
                <ul className="text-sm mt-2">
                  <li> · 
                    Collaborated with cross-functional teams to onboard
                    solutions for major corporations in the UK and US.
                  </li>
                  <li> · 
                    Designed and deployed 7 dynamic websites using Next.js and
                    Blazor, leading to a 35% increase in user engagement
                    metrics.
                  </li>
                  <li> · 
                    Rewrote legacy .NET application to React and .NET Core,
                    resulting in a 50% increase in performance metrics.
                  </li>
                </ul>
                <ul className="hidden md:flex gap-2 mt-2">
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    .NET Core
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    NextJS
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    ReactJS
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    Blazor
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    T-SQL
                  </li>
                </ul>
              </div>
            </article>
            <article className="flex gap-4 mt-6">
              <header className="w-1/6">
                <time datetime="2022-01-01">2022 — 2023</time>
              </header>
              <div className="w-5/6">
                <h3 className="font-bold">
                  Front End Developer Intern · Business Brigade
                </h3>
                <ul className="text-sm mt-2">
                  <li> · 
                    Utilized HTML, CSS, and JavaScript to transform wireframes
                    into user-friendly website layouts, resulting in a 20%
                    increase in user accessibility metrics.
                  </li>
                  <li> · 
                    Implemented design principles in practical website
                    development, successfully completing three projects ahead of
                    schedule.
                  </li>
                  <li> · 
                    Used advanced design software tools to create visually
                    appealing wireframes and layouts, reducing the time spent on
                    design iterations by 50% and increasing overall project
                    efficiency.
                  </li>
                </ul>
                <ul className="hidden md:flex gap-2 mt-2">
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    HTML5
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    CSS3
                  </li>
                  <li
                    className="rounded-full text-sm px-3 py-1.5 text-center w-fit"
                    style={{
                      background: `${savedBtnColors}`,
                      color: `${fontColors}`,
                    }}
                  >
                    JavaScript
                  </li>
                </ul>
              </div>
            </article>
          </section>
        </div>
      </div>
    </>
  );
}

export default Resume;
