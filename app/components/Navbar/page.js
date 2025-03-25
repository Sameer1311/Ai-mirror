"use client";
import { useState, useEffect } from "react";
import { MenuSquareIcon, XSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import TransitionLink from "../Transitionlink";
import { FaBitcoin } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  IoIosMore,
  IoMdGitNetwork,
  IoMdHome,
  IoMdPartlySunny,
} from "react-icons/io";

const Navbar = () => {
  const [menuBar, setMenuBar] = useState(false);
  const { theme } = useTheme();

  const handleMenubar = () => setMenuBar(!menuBar);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuBar && !event.target.closest(".menu-container, .menu-btn")) {
        setMenuBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuBar]);

  return (
    <div className="fixed top-2 left-4 z-50">
      {/* Toggle Button */}
      <Button
        onClick={handleMenubar}
        className="menu-btn flex items-center justify-center p-3 border-2  dark:border-blue-500 rounded-md  shadow-lg"
      >
        {menuBar ? (
          <XSquareIcon width={36} className="text-black dark:text-white" />
        ) : (
          <MenuSquareIcon width={36} className="text-black dark:text-white" />
        )}
      </Button>

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: menuBar ? 0 : "-100%" }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,
        }}
        className="menu-container fixed top-0 left-0 w-[270px] h-full p-6 flex flex-col items-center bg-gray-100 dark:bg-gray-900 shadow-lg border-r-2 dark:border-blue-500"
      >
        {/* Close Button */}
        <Button
          onClick={handleMenubar}
          className="absolute top-4 right-4 p-2 border-2 border-blue-500 rounded-md bg-white dark:bg-gray-800"
        >
          <XSquareIcon width={24} className="text-black dark:text-white" />
        </Button>

        {/* AI Image + Title */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src={theme === "dark" ? "/images/Ai_light.jpeg" : "/images/Ai_dark.jpeg"}
            alt="AI Icon"
            width={70}
            height={70}
            className="border-2 border-blue-500 rounded-full shadow-lg"
          />
          <h1 className="text-xl font-bold text-blue-500 mt-3">AI Mirror</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Welcome to the <b className="text-blue-500">AI</b> world
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="w-full flex flex-col gap-4 text-lg font-medium text-gray-900 dark:text-gray-300">
          {[
            { href: "/", label: "Home", icon: <IoMdHome size={22} /> },
            { href: "/components/Weather", label: "AI Weather", icon: <IoMdPartlySunny size={22} /> },
            { href: "/components/News", label: "AI News", icon: <IoMdGitNetwork size={22} /> },
            { href: "/components/Crypto", label: "AI Crypto", icon: <FaBitcoin size={22} /> },
            { href: "/components/Credit", label: "Credit", icon: <IoIosMore size={22} /> },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:text-blue-500 hover:bg-white/10 transition-all text-center cursor-pointer"
            >
              {item.icon} <TransitionLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;
