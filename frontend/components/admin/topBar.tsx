"use client"

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export default function TopBar() {
    const [isSunny, setIsSunny] = useState(true); 
    const [isRotated, setIsRotated] = useState(false);

    const toggleTheme = () => {
        setIsSunny(prevState => !prevState);
        setIsRotated(prevState => !prevState);
    };

    return (
        <div className="p-4 sm:ml-64 mt-2 flex items-center gap-4 flex-wrap">
    {/* Search Bar */}
    <div className="flex-grow min-w-[200px] max-w-full">
        <div className="w-full mx-auto rounded-full">
            <div className="relative flex items-center">
                <IoSearch className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600 transition-colors duration-300 group-hover:text-green-600 group-focus-within:text-green-600" />
                <input
                    type="text"
                    className="w-full bg-white placeholder:text-slate-400 text-black text-sm rounded-md pl-10 pr-3 py-2 transition duration-300 ease shadow-sm focus:shadow focus:ring-2 focus:ring-green-600 hover:ring-2 hover:ring-green-600"
                    placeholder="Search"
                />
            </div>
        </div>
    </div>

    {/* Notifications and Theme Toggle */}
    <div className="flex relative items-center ml-4 mr-8 gap-6">
        <button className="hover:bg-[#232323] px-1 py-1 rounded-lg bg-black">
            <IoNotificationsOutline className="w-6 h-6 text-white hover:animate-swing hover:text-yellow-400" />
        </button>

        {/* Toggle button for theme (sun/moon) */}
        <button className="hover:bg-[#232323] px-1 py-1 rounded-lg bg-black" onClick={toggleTheme}>
            {isSunny ? (
                <IoMdSunny className="w-6 h-6 text-white hover:text-yellow-400 hover:rotate-90 transition-transform duration-300 ease-in-out" />
            ) : (
                <FaRegMoon
                    className={`w-6 h-6 text-white hover:text-blue-700 transition-all duration-300 ease-in-out ${isRotated ? "" : "rotate-180"}`}
                />
            )}
        </button>
        <div className="hidden lg:block">
            <button className="group py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-400 text-gray-800 hover:border-green-600 focus:outline-none focus:border-green-600 active:border-green-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-green-600 dark:focus:border-green-600 dark:active:border-green-600">
                <span className="font-semibold whitespace-nowrap">Add more item</span>
                <FaPlus className="text-gray-600 group-hover:text-green-600 group-focus:text-green-600 transition-colors duration-200" />
            </button>
        </div>
    </div>
</div>
    );
}
