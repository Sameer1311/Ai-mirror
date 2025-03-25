"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollIcon, CircleCheckBigIcon } from "lucide-react";
import TransitionLink from "../Transitionlink";

const About2 = () => {
    const titleRef = useRef(null);
    const verticalLineRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: "-200%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            gsap.fromTo(
                verticalLineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    duration: 2,
                    scrollTrigger: {
                        trigger: verticalLineRef.current,
                        start: "top 80%",
                        end: "bottom 10%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            sectionsRef.current.forEach((section, i) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, x: i % 2 === 0 ? -100 : 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            end: "top 65%",
                            scrub: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });

            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="overflow-hidden h-full flex flex-col items-center px-4 md:px-8">
            {/* Scroll Hint */}
            <div className="mt-10 text-lg animate-bounce flex items-center space-x-3">
                <span>Scroll for more...</span> 
                <ScrollIcon width={24} aria-label="Scroll down icon" />
            </div>

            {/* Title */}
            <div ref={titleRef} className="text-center my-10 font-bold">
                <h3 className="text-gray-500 dark:text-amber-100 text-2xl md:text-3xl">
                    {"What's in this website"}
                </h3>
                <h1 className="text-4xl md:text-5xl my-4">Norms</h1>
            </div>

            {/* Timeline Section */}
            <div className="relative w-full max-w-4xl flex flex-col items-center">
                <div 
                    ref={verticalLineRef} 
                    className="absolute left-1/2 w-1 bg-gray-400 dark:bg-gray-600 h-full transform -translate-x-1/2"
                />

                {[
                    { title: "News", description: "Stay updated with the latest advancements in AI, Technology, and Global trends.", highlight: "text-blue-500" },
                    { title: "Crypto", description: "Track the latest cryptocurrency prices and market trends in real time.", highlight: "text-green-500" },
                    { title: "Weather", description: "Get accurate weather forecasts and climate updates for your location.", highlight: "text-yellow-500" },
                    { title: "AI Chat", description: "Interact with an AI-powered chatbot for assistance and fun conversations.", highlight: "text-purple-500" }
                ].map((section, i) => (
                    <div 
                        key={i} 
                        ref={(el) => (sectionsRef.current[i] = el)} 
                        className={`w-full flex ${i % 2 === 0 ? "justify-start" : "justify-end"} py-12 px-2 sm:px-4 md:px-6`}
                    >
                        <div className="p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-md shadow-lg">
                            <div className="flex items-center space-x-3 mb-2">
                                <CircleCheckBigIcon width={32} className={section.highlight} aria-label={`${section.title} icon`} />
                                <TransitionLink className="text-xl dark:text-amber-100 font-semibold" href={`/components/${section.title}`} label={section.title} />
                            </div>
                            <p className={`text-sm font-bold ${section.highlight}`}>{section.description}</p>
                        </div>
                    </div>
                ))}
                <div className="module relative z-10 md:top-0  mt-10 md:my-3 mb-5 font-bold p-1 rounded-md">
  <TransitionLink 
    href="/components/Credit" 
    label="Contact" 
    className="textAnimation hover:text-blue hover:underline"
  />
</div>

            </div>
        </div>
    );
};

export default About2;
