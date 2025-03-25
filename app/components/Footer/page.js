"use client"
import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn ,FaCode} from 'react-icons/fa'
import TransitionLink from '../Transitionlink'

const Footer = () => {
  return (
    <div className="relative w-full py-10 px-6 md:px-16   bg-gradient-to-br from-gray-150 to-gray-300 dark:from-gray-900 dark:to-black  text-gray-900 dark:text-gray-100">
      
      <div className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-black/20 backdrop-blur-lg border-t  dark:border-gray-800/50  " />

      <footer className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold ">AI Mirror</h2>
            <p className="mt-2 font-bold">Shaping the future with AI technology</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap font-bold justify-center md:justify-start gap-6 mt-6 md:mt-0">
          <TransitionLink href="/" label="Home" className="hover:text-blue-400 transition border-none"/>
          <TransitionLink href="/components/About" label="About" className="hover:text-blue-400 transition"/>
          <TransitionLink href="/components/About2" label="Credits" className="hover:text-blue-400 transition"/>
          <TransitionLink href="/About2" label="Projects" className="hover:text-blue-400 transition"/>
          <Link href="https://sameer-portfolio-xi.vercel.app/Components/Projects">Projects</Link>
          </div>

          {/* Social Media Icons */}
          <div  className="flex gap-4 mt-6 md:mt-0">
          <Link href="https://www.facebook.com/" className="p-2 bg-blue-600/40 rounded-full backdrop-blur-md hover:bg-blue-500/60 transition"><FaFacebookF size={20} /></Link>
          <Link href="https://leetcode.com/u/codesameer//" className="p-2 bg-blue-400/40 rounded-full backdrop-blur-md hover:bg-blue-300/60 transition"><FaCode size={20} /></Link>
          <Link href="https://www.instagram.com/negisameer_106/?hl=en" className="p-2 bg-pink-600/40 rounded-full backdrop-blur-md hover:bg-pink-500/60 transition"><FaInstagram size={20} /></Link>
          <Link href="https://www.linkedin.com/in/sameer-negi-52a85b336/" className="p-2 bg-blue-700/40 rounded-full backdrop-blur-md hover:bg-blue-600/60 transition"><FaLinkedinIn size={20} /></Link> 
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm  mt-8 border-t  dark:border-gray-800/50 pt-4">
          © {new Date().getFullYear()} AI Mirror. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer
 