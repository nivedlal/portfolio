import React from "react";

function Projects() {
  const projects = Array.from({ length: 13 }, (_, index) => index + 1);

  return (
    <>
    <div className="hidden">
      {/* <div className="md:flex flex-1 gap-4"> */}
        <div className=" md:w-1/2 grid grid-cols-3 gap-4 overflow-y-auto h-[7.2rem] md:h-96 2xl:h-[35rem] overflow-x-hidden">
          {projects.map((project) => (
            <div
              key={project}
              className="border w-auto h-24 md:h-36 lg:h-40 flex items-center justify-center me-2"
            >
              {project.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="relative md:w-1/2 h-full mt-4 md:mt-0">
          <img
            src="bg_3.jpeg"
            alt="Background"
            className="relative inset-0 w-full object-cover"
          />
          <div className="flex flex-col absolute z-10 bottom-0 top-0 md:top-auto">
            <img src="home.png" alt="Biig Piig Logo" className="ps-4 w-20" />
            <div className="ps-4 sm:p-4 mt-auto">
              <p className="uppercase font-bold">Fun</p>
              <p className="text-2xl uppercase font-bold">Biig Piig</p>
              <p className="text-xs">Currently Playing:</p>
              <p className="text-lg">Phantoms ft. Big Wild - Firepit</p>
              <p className="text-xs">3:17</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex flex-1 gap-4 items-center justify-center">
          <p className="text-center md:text-2xl">⚠️ Currently undergoing maintenance. Please check back soon!</p>
      </div>
    </>
  );
}

export default Projects;
