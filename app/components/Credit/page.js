"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  UserCog2Icon,
  CheckCircle,
  Code,
  Package,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";


const CreditCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="p-6 rounded-2xl shadow-lg flex items-center gap-4 w-80 border-2 dark:border-white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Icon size={40} className="text-blue-400" />
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const Credit = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8  ">
      <motion.h1
        ref={textRef}
        className="text-4xl font-bold mb-6 text-gray-700 dark:text-amber-200 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Credits & Acknowledgments
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mt-10">
        <CreditCard
          icon={User}
          title="Developer Info"
          description="Developed by: Sameer Negi"
        />
        <CreditCard
          icon={UserCog2Icon}
          title="ALternative helpers"
          description="Sketch fab  , Chat gpt , Playground Ai  "
        />
        <CreditCard
          icon={Users}
          title="Contributors"
          description={
            <Link
              href="https://github.com/Sameer1311"
              className="text-blue-500 hover:underline"
            >
              Sameer1311
            </Link>
          }
        />
        <CreditCard
          icon={Code}
          title="Technologies"
          description="Next.js, React Three Fiber, GSAP, Framer Motion"
        />
        <CreditCard
          icon={Package}
          title="Libraries"
          description="Lucide React, next-themes, Shad-cn, Drei, Tailwind CSS"
        />
        <CreditCard
          icon={CheckCircle}
          title="Developer Contact"
          description={
            <Link
              href="https://sameer-portfolio-xi.vercel.app/"
              className="text-blue-500 hover:underline"
            >
              Developer Portfolio
            </Link>
          }
        />
      </div>

      {/* Sketchfab Embedded 3D Model */}
      <div className="mt-10 w-fit p-2 h-96">
        <iframe
          id="hero-viewer"
          className="w-full h-full bg-black"
          src={`https://sketchfab.com/models/92bcda53d5eb4eef8cd842a1b65ff205/embed?autostart=1&camera=0&graph_optimizer=1&internal=1&max_texture_size=1024&merge_materials=1&preload=0&scrollwheel=0&sound_enable=0&transparent=1&ui_animations=0&ui_annotations=0&ui_controls=0&ui_fadeout=0&ui_fullscreen=0&ui_help=0&ui_infos=0&ui_inspector=1&ui_settings=0&ui_snapshots=0&ui_stop=0&ui_theatre=0&ui_watermark=0`}

          allow="autoplay; fullscreen; xr-spatial-tracking"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          title="Store 3D viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default Credit;
