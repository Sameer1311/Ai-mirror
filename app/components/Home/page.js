"use client"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import Link from "next/link"

const HomePage = () => {
    const textRef = useRef(null)
    const righttextRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(
            textRef.current, 
            { y: "-200%", opacity: 0 },  
            { y: "0%", opacity: 1, delay: 1, duration: 2, ease: "power3.out" }
        )

        gsap.fromTo(
            righttextRef.current, 
            { y: "-200%", opacity: 0 },  
            { y: "0%", opacity: 1, delay: 1.5, duration: 2, ease: "power3.out" }
        )
    }, [])

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
            {/* Background Video */}
            <video
                src="/videos/hero-1.mp4"
                autoPlay
                loop
                muted
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30"
            />

            {/* Content Wrapper */}
            <div className="relative flex flex-col md:flex-row md:justify-around justify-evenly h-full items-center w-full text-center px-5">
                
                {/* Left Text */}
                <div 
                    ref={textRef} 
                    className="md:w-[40vw] px-5 md:px-10 text-black dark:text-white"
                >
                    <h1 className="text-4xl font-bold">
                        Welcome to <span className="text-blue-500 dark:text-blue-400">AI Mirror</span>
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                        Your all-in-one AI-powered assistant for real-time updates.  
                        Stay informed with <span className="font-bold text-blue-500 dark:text-blue-400">latest news</span>,  
                        track <span className="text-blue-500 dark:text-blue-400 font-bold">live weather conditions</span>,  
                        monitor <span className="text-blue-500 dark:text-blue-400 font-bold">crypto prices</span>,  
                        and convert <span className="text-blue-500 dark:text-blue-400 font-bold">currencies</span> instantly.  
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
                        Experience the future with smart AI assistance at your fingertips.
                    </p>
                </div>

                {/* Right Text & Button */}
                <div 
                    ref={righttextRef} 
                    className="right relative flex flex-col justify-center items-center text-black dark:text-white"
                >
                    <h1 className="text-4xl font-bold">
                        Discover the power of <b className="text-blue-500 dark:text-blue-400">AI</b> world
                    </h1>
                    <Link href="/components/Structure">
                    <Button className="my-5 px-6 py-2 text-white bg-blue-500 dark:bg-blue-400 dark:text-black rounded-md">
                        Explore
                    </Button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage
