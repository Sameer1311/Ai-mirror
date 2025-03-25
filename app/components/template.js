"use client";

import { useEffect } from "react";
import { animationPageIn } from "../utils/animation";

const Template = ({ children, ...props }) => {
  useEffect(() => {
    animationPageIn();
  }, []);

  return (
    <div {...props}>
      <div
        id="banner1"
        className="min-h-screen z-50 bg-black dark:bg-white fixed top-0 left-0 w-1/4 "
      ></div>
      <div
        id="banner4"
        className="min-h-screen z-50 bg-black dark:bg-white fixed top-0 left-3/4 w-1/4 "
      ></div>
      <div
        id="banner2"
        className="min-h-screen z-50 bg-black dark:bg-white fixed top-0 left-1/4 w-1/4 "
      ></div>
      <div
        id="banner3"
        className="min-h-screen z-50 bg-black dark:bg-white fixed top-0 left-2/4 w-1/4 "
      ></div>
     
      {children}
    </div>
  );
};

export default Template;
