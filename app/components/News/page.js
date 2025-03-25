"use client";

import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TransitionLink from "../Transitionlink";

const News = () => {
  const [BusinessNews, setBusinessNews] = useState([]);
  const [TechNews, setTechNews] = useState([]);
  const [ArticlesNews, setArticlesNews] = useState([]);
  const [EverythingData, setEverythingData] = useState([]);
  const [activeSection, setActiveSection] = useState("Top News");
  const LeftRef = useRef(null);
  const RightRef = useRef(null);
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const urls = [
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`,
          `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`,
          `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`,
          `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`,
        ];

        const [businessRes, techRes, articlesRes, everythingRes] =
          await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));

        setBusinessNews(businessRes.articles || []);
        setTechNews(techRes.articles || []);
        setArticlesNews(articlesRes.articles || []);
        setEverythingData(everythingRes.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [API_KEY]);

  useEffect(() => {
    if (LeftRef.current && RightRef.current) {
      gsap
        .timeline({ delay: 1, ease: "power1.out" })
        .fromTo(LeftRef.current, { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1 })
        .fromTo(RightRef.current, { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");
    }
  }, []);

  const getActiveNews = () => {
    switch (activeSection) {
      case "Business":
        return BusinessNews;
      case "Tech":
        return TechNews;
      case "Articles":
        return ArticlesNews;
      default:
        return EverythingData;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-150 to-gray-300 dark:from-gray-900 dark:to-black  text-gray-900 dark:text-gray-100">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video className="w-full h-[100vh] object-cover opacity-50 dark:opacity-40" src="/videos/hero-4.mp4" autoPlay loop muted preload="auto" />
      </div>

      {/* News Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-evenly text-center p-6 h-screen">
        <div className="left bg-black dark:bg-white border-2 border-black dark:border-white rounded-lg p-6 text-white dark:text-black shadow-lg" ref={LeftRef}>
          <h3 className="text-3xl font-semibold">🌍 AI Mirror News</h3>
          <p className="text-sm mt-2 max-w-md font-bold">
            Stay updated with the latest advancements in <b className="text-blue-500">AI</b>, <b className="text-blue-500">Technology</b>, and{" "}
            <b className="text-blue-500">Global trends</b>.
          </p>
        </div>
        <h1 className="right text-4xl font-bold text-white" ref={RightRef}>
          📰 AI Mirror News
        </h1>
      </div>

      {/* Category Selector */}
      <div className="relative z-10 flex flex-wrap flex-col md:flex-row justify-center gap-4 p-4">
        {["Top News", "Business", "Tech", "Articles"].map((section) => (
          <button
            key={section}
            className={`px-6 py-3 rounded-lg font-bold transition-all shadow-md ${
              activeSection === section ? "bg-blue-600 text-white" : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
            } hover:scale-105`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* News Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 relative z-10">
        {getActiveNews().map((article) => (
          <div key={article.url} className="relative flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 transition-all hover:shadow-xl hover:scale-[1.02]">
            {/* News Image */}
            <div className="w-full h-56 overflow-hidden">
              <Image
                src={article.urlToImage || "/images/placeholder.jpeg"}
                alt={article.title || "News image"}
                width={450}
                height={250}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 hover:absolute"
                priority
                onError={(e) => (e.currentTarget.src = "/images/placeholder.jpeg")}
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{article.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">{article.description}</p>

              {/* Read More Button */}
              <div className="w-full text-center font-bold text-xs">
                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                  <span className="w-fit text-blue-500 hover:text-blue-950">{"Read more -> "}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 md:hidden gap-6 p-6">
        {getActiveNews().length > 0 ? (
          getActiveNews().map((article) => (
            <div key={article.url} className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800">
              <h2 className="text-lg font-bold">{article.title}</h2>
              <p className="text-sm mt-2">{article.description}</p>
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <Button className="mt-2">Read more</Button>
              </Link>
            </div>
          ))
        ) : (
          <span className="text-center text-red-500 text-xl">Something went wrong. Please contact the owner <p className="text-blue-500 hover:underline font-bold"><TransitionLink href="components/Credit" label="Click here"  /></p></span>
        )}
      </div>
    </div>
  );
};

export default News;
