"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaBitcoin, FaEthereum, FaExchangeAlt, FaSearch } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/rates`);
        const data = await response.json();
        if (data.data) {
          const rates = data.data.reduce((acc, coin) => {
            acc[coin.symbol] = parseFloat(coin.rateUsd);
            return acc;
          }, {});
          setCryptoData(rates);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  return (
    <div className="  text-gray-900 dark:text-gray-100 min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between space-y-8 md:space-y-0">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4">
          <h1 className="flex flex-wrap justify-center text-3xl sm:text-4xl font-extrabold space-x-3">
            <span className="flex items-center text-yellow-400"><FaBitcoin className="mr-2" /> Crypto</span>
            <span className="flex items-center text-green-400"><FaEthereum className="mr-2" /> NFT</span>
            <span className="flex items-center text-blue-400"><FaExchangeAlt className="mr-2" /> Trade</span>
            <span className="flex items-center text-pink-400"><IoMdTrendingUp className="mr-2" /> Fun</span>
          </h1>
          <p className="text-lg max-w-lg text-gray-800 dark:text-gray-300 mt-4">
            Explore the world of digital assets. Trade securely and easily with our platform. Join the future of finance today!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link href="https://crypto.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500 hover:bg-blue-600 transition-transform hover:scale-105 px-6 py-3 text-lg font-semibold flex items-center space-x-2 rounded-lg shadow-lg">
                <FaBitcoin /> <span>Buy Crypto</span>
              </Button>
            </Link>
            <Link href="https://nftrade.com/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 transition-transform hover:scale-105 px-6 py-3 text-lg font-semibold flex items-center space-x-2 rounded-lg shadow-lg">
                <FaEthereum /> <span>Trade NFT</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/Crypto.svg"
            width={400}
            height={400}
            alt="Bitcoin image"
            className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>

      <hr className="w-full border-t border-gray-600 my-10" />

      {/* Search Input Field */}
      <div className="relative w-full max-w-md mb-8 px-4">
        <FaSearch className="absolute left-6 top-[17px] text-gray-800 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search Cryptocurrency..."
          className="w-full p-3 pl-10 text-gray-800 dark:text-gray-300 border-2 border-black dark:border-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />
      </div>

      {/* Live Crypto Rates Section */}
      <div className="text-center text-xl font-semibold px-4">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Live Crypto Rates</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Object.entries(cryptoData)
            .filter(([currency]) => currency.includes(searchTerm))
            .map(([currency, rate]) => (
              <li
                key={currency}
                className="p-4 sm:p-5 border border-gray-700 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:border-yellow-400"
              >
                <span className="font-bold text-yellow-400">{currency}</span>: 
                <span className="text-green-400">${rate.toFixed(2)}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Crypto;
