import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const projects = {
    project_1: {
      image: "Login.png",
      name: "Login",
      description: "User Login Flow - Access the platform with credentials.",
      icon: "loginIcon.png",
    },
    project_2: {
      image: "Dashboard.png",
      name: "Dashboard",
      description: "Dashboard - A landing page after logging in.",
      icon: "dashboardIcon.png",
    },
    project_3: {
      image: "Directory.png",
      name: "Directory",
      description:
        "Directory Overview - Browse the list of available products.",
      icon: "directoryIcon.png",
    },
    project_4: {
      image: "Product.png",
      name: "Product",
      description: "Product Catalog - Choose product requirements.",
      icon: "productIcon.png",
    },
    project_5: {
      image: "Cart.png",
      name: "Cart",
      description:
        "Shopping Cart - Add selected products to cart for checkout.",
      icon: "cartIcon.png",
    },
    project_6: {
      image: "Checkout.png",
      name: "Checkout",
      description: "Checkout Process - Complete the purchase with payment.",
      icon: "checkoutIcon.png",
    },
    project_7: {
      image: "Success.png",
      name: "Success",
      description:
        "Order Success - Confirmation page after completing the order.",
      icon: "successIcon.png",
    },
    project_8: {
      image: "Order History.png",
      name: "Order History",
      description: "Order History - View past orders.",
      icon: "historyIcon.png",
    },
    project_9: {
      image: "Order Details.png",
      name: "Order Details",
      description: "Order Details - Detailed view of each individual order.",
      icon: "detailsIcon.png",
    },
    project_10: {
      image: "Drafts.png",
      name: "Drafts",
      description: "Draft Orders - View and manage saved, unfinished orders.",
      icon: "draftIcon.png",
    },
    project_11: {
      image: "Menu.png",
      name: "Menu",
      description: "Menu Navigation - Easy access to pages.",
      icon: "menuIcon.png",
    },
    project_12: {
      image: "Error.png",
      name: "Error",
      description:
        "Error Page - Display error messages for any issues during the process.",
      icon: "errorIcon.png",
    },
  };

  const defaultMessage = (
    <div className="w-20 h-20 bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-full flex items-center justify-center m-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 500 500"
        className="animate-spin-slow"
      >
        <defs>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle_top"
          ></path>
          <path
            d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
            id="textcircle_bottom"
          ></path>
        </defs>
        <text dy="50" textLength="1200" fontSize="70" fill="white">
          <textPath xlinkHref="#textcircle_bottom">CLICK ON A TILE TO BEGIN.</textPath>
        </text>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src="left.png" className="w-6 h-6 invert hidden md:block"/>
          <img src="up.png" className="w-6 h-6 invert block md:hidden"/>
      </div>
    </div>
  );
  const [selectedImage, setSelectedImage] = useState(defaultMessage);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [clickedTile, setClickedTile] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      ".animate",
      {
        opacity: 0,
        x: -20,
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
      ".animateMain",
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        stagger: 0.4,
        delay: 2,
      }
    );
  }, []);

  const handleTileClick = (projectKey) => {
    gsap.fromTo(
      ".image-container img",
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      }
    );
    setSelectedImage(projects[projectKey].image);
    setSelectedDescription(projects[projectKey].description);
    setClickedTile(projectKey);
  };

  const isImage = (src) => {
    return typeof src === "string" && src.endsWith(".png");
  };

  return (
    <>
      <div className="md:flex flex-1 gap-4 justify-between m-2 md:m-0 overflow-y-hidden">
        <div className="md:w-1/2 grid grid-cols-3 gap-4 overflow-y-auto h-[12rem] md:h-[28rem] 2xl:h-[45rem] overflow-x-hidden mb-2 md:mb-0">
          {Object.keys(projects).map((projectKey) => (
            <div
              key={projectKey}
              className="border w-auto h-24 md:h-36 lg:h-40 flex items-center justify-center md:me-2 cursor-pointer animate flex-col gap-2 text-xs md:text-base"
              onClick={() => handleTileClick(projectKey)}
            >
              <img
                src={projects[projectKey].icon}
                alt={`${projects[projectKey].name}`}
                className="w-6 h-6 invert"
              />
              {projects[projectKey].name}
            </div>
          ))}
        </div>
        <div className="w-full md:w-[46%] 2xl:w-1/2 object-cover rounded-md me-6 border flex items-center justify-center relative animateMain image-container overflow-x-hidden group">
          {isImage(selectedImage) ? (
            <img
              src={selectedImage}
              alt="Project"
              className="object-cover rounded-md w-full h-full"
            />
          ) : (
            <span>{selectedImage}</span>
          )}

          {selectedDescription && (
            <div className="absolute bottom-0 left-0 p-4 bg-gray-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-t w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {selectedDescription}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;