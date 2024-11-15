import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
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
        ".main",
        {
          opacity: 0,        
        },
        {
          opacity: 1,        
          duration: 1,     
          ease: "power4.in",
        }
      );
    gsap.fromTo(
      ".profile",
      {
        opacity: 0,
        scale: 0,
        rotation: -60,
        x: -100,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        duration: 1,
        ease: "back.out(1.7)", 
        delay: 0.5,
      }
    );
    gsap.fromTo(
      ".icons",
      {
        opacity: 0, 
        x: -20, 
      },
      {
        opacity: 1, 
        x: 0, 
        duration: 4,
        ease: "bounce.in",
        stagger: 0.3,
        delay: 1, 
      }
    );
    gsap.fromTo(
      ".hero",
      {
        opacity: 0, 
        x: 20, 
      },
      {
        opacity: 1, 
        x: 0, 
        duration: 5,
        ease: "back.in(1.7)",
        stagger: 0.3,
        delay: 1, 
      }
    );
    gsap.fromTo(
      ".form",
      {
        opacity: 0, 
        x: 20, 
      },
      {
        opacity: 1, 
        x: 0, 
        duration: 1,
        stagger: 0.3,
        delay: 1, 
      }
    );
  }, []);

  const formRef = useRef();
  const [form, setForm] = useState({name:'', subject:'', message:''})
  const handleChange = ({target: {name, value}})=>{ setForm({...form, [name]: value})}
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const body = encodeURIComponent(`Hi there, I'm ${form.name}, and I just wanted to reach out to say "${form.message}".`);
    const mailtoLink = `mailto:nivedlalp@gmail.com?subject=${form.subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  const handleClear = () => {
    setForm({ name: "", subject: "", message: "" });
  };

  return (
    <>
      <div className="overflow-y-auto h-96 2xl:h-[35rem] w-full text-neutral-700">
        <div className="md:flex justify-between gap-4">
          <div
            className="main w-full p-4 2xl:p-12 md:flex gap-8 md:mx-4 mb-4 rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25 border border-gray-100"
          >
            <div className="md:w-1/2 rounded-lg m-2 shadow-lg p-4 md:p-2 profile" style={{background: "#ecf0f3" }}>
              <div className="flex justify-center my-3">
                <div
                  className="w-36 h-36 md:w-48 md:h-48 2xl:w-60 2xl:h-60 rounded-full bg-cover bg-center hero"
                  style={{
                    backgroundImage: `url('HeroImage.jpg')`,
                    border: `1rem solid #ecf0f3`,
                    boxShadow: `-3px -3px 7px #ffffff, 3px 3px 5px #ceced1`,
                  }}
                ></div>
              </div>
              <p className="mb-2 text-center font-bold uppercase md:text-xl 2xl:mb-4 form">
                Nived<span className="opacity-30">lal Prakash</span>
              </p>
              <div className="flex gap-4 justify-center md:mb-1 2xl:mb-4">
                <a
                  href="#"
                  className="rounded-full flex justify-center items-center icons"
                  style={{
                    background: "#ecf0f3",
                    boxShadow: "-3px -3px 7px #ffffff, 3px 3px 5px #ceced1",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('linkedin.png')`,
                      border: `8px solid #ecf0f3`,
                    }}
                    className="bg-cover bg-center h-10 w-10 rounded-full"
                  ></div>
                </a>
                <a
                  href="#"
                  className="rounded-full flex justify-center items-center icons"
                  style={{
                    background: "#ecf0f3",
                    boxShadow: "-3px -3px 7px #ffffff, 3px 3px 5px #ceced1",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('behance.png')`,
                      border: `8px solid #ecf0f3`,
                    }}
                    className="bg-cover bg-center h-10 w-10 rounded-full"
                  ></div>
                </a>
                <a
                  href="#"
                  className="rounded-full flex justify-center items-center icons"
                  style={{
                    background: "#ecf0f3",
                    boxShadow: "-3px -3px 7px #ffffff, 3px 3px 5px #ceced1",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('instagram.png')`,
                      border: `8px solid #ecf0f3`,
                    }}
                    className="bg-cover bg-center h-10 w-10 rounded-full"
                  ></div>
                </a>
                <a
                  href="#"
                  className="rounded-full flex justify-center items-center icons"
                  style={{
                    background: "#ecf0f3",
                    boxShadow: "-3px -3px 7px #ffffff, 3px 3px 5px #ceced1",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('dribbble.png')`,
                      border: `8px solid #ecf0f3`,
                    }}
                    className="bg-cover bg-center h-10 w-10 rounded-full"
                  ></div>
                </a>
              </div>
            </div>
            <hr className="w-full h-0.5 md:hidden mt-4 md:mb-6 border-0 rounded bg-gray-300" />
            <form className="flex flex-col gap-4 w-full" style={{color:savedColors[0]}} ref={formRef} onSubmit={handleSubmit}>
              <div className="form">
                <p className="font-bold text-2xl text-center md:text-start mt-4 md:mt-1">Drop Me a Line</p>
                <hr className="w-full md:h-0.5 mt-4 md:mb-4 border-0 rounded bg-gray-300" />
              </div>
              <div className="space-y-3 2xl:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center form">
                  <label
                    htmlFor="name"
                    className="uppercase font-bold text-sm tracking-widest sm:w-1/4 mb-2 md:mb-0"
                  >
                    Full name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    required
                    className="appearance-none text-gray-900 rounded-md leading-5 px-4 py-3 flex-grow sm:w-3/4 text-sm"
                    placeholder="Real one, not your alter ego"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center form">
                  <label
                    htmlFor="subject"
                    className="uppercase font-bold text-sm tracking-widest sm:w-1/4 mb-2 md:mb-0"
                  >
                    Subject
                  </label>
                  <input
                    name="subject"
                    id="subject"
                    type="text"
                    required
                    className="appearance-none text-gray-900 rounded-md leading-5 px-4 py-3 flex-grow sm:w-3/4 text-sm"
                    placeholder="You can just type in Portfolio Mail"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center form">
                  <label
                    htmlFor="message"
                    className="uppercase font-bold text-sm tracking-widest sm:w-1/4 mb-2 md:mb-0"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    type="text"
                    id="message"
                    className="appearance-none text-gray-900 rounded-md leading-5 px-4 py-3 flex-grow sm:w-3/4 text-sm resize-none"
                    placeholder="Do try to keep it epic.. or, you know, a bad joke. I’m flexible."
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2 2xl:mt-6">
              <button
                  className="border rounded-md border-gray-100 py-2 px-3 form me-4"
                  style={{
                    backgroundColor: savedColors[0],
                    color: savedColors[2],
                  }}
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  className="border rounded-md border-gray-100 py-2 px-3 form"
                  style={{
                    backgroundColor: savedColors[1],
                    color: savedColors[2],
                  }}
                  type="submit"
                >
                  Shoot!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
