"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BiLogOutCircle } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [username, setUsername] = useState("");
  const [isRotated, setIsRotated] = useState(false);
  const [isSunny, setIsSunny] = useState(true);
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push("/loginAdmin");
  }

  useEffect(() => {
    // Fetch username from localStorage or an API
    const storedUsername = localStorage.getItem("username") || "Admin";
    setUsername(storedUsername);
  }, []);


  const toggleTheme = () => {
    setIsSunny(prevState => !prevState);
    setIsRotated(prevState => !prevState);
  };


  return (
    <div className=''>
      <div className="lg:hidden py-16 text-center">
        <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-sidebar-header" aria-label="Toggle navigation" data-hs-overlay="#hs-sidebar-header">
          Open
        </button>
      </div>

      <div id="hs-sidebar-header" className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-[10] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" aria-label="Sidebar" >
        <div className="relative flex flex-col h-full max-h-full ">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <div className="flex space-x-2">
              <a
                className="flex items-center font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
                href="../dashboardAdmin/"
                aria-label="RiceSource"
              >
                <img src="/Group.svg" className="w-8 h-8" alt="Globe Icon" />
                <span className="ml-2">
                  <span className="text-green-600">Rice</span>
                  <span className="text-green-800">Source</span>
                </span>
              </a>
            </div>


            <div className="lg:hidden -me-2">
              <button type="button" className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200" data-hs-overlay="#hs-sidebar-header">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </header>

          <div className="mt-auto p-2 border-y border-gray-200 dark:border-neutral-700">
            <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
              <button id="hs-sidebar-header-example-with-dropdown" type="button" className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-green-100 focus:outline-none focus:bg-green-300 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <img className="shrink-0 size-5 rounded-full bg-gray-200" src="/image/default-user-preview.png" alt="Avatar" />
                {/* Raffy Attala */}
                <span>
                  {username}
                </span>
                <HiDotsHorizontal className="shrink-0 size-3.5 ms-auto" />
              </button>

              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-opacity duration-200 opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-1 space-y-1">
                  <a
                    href="../dashboardAdmin/setting"
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-green-100 focus:bg-green-300 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <CiSettings className="size-5" />
                    Settings
                  </a>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-red-500 hover:text-white focus:bg-red-600"
                  >
                    <BiLogOutCircle className="size-5" />
                    Logout
                  </button>

                </div>
              </div>

            </div>
          </div>

          <nav className="h-full flex flex-col justify-between overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="hs-accordion-group pb-0 px-2 pt-2 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboardAdmin/"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100 focus:bg-green-300"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboardAdmin/userAdmin"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100 focus:bg-green-300"
                  >
                    <RiAdminLine className="size-4" />
                    User admin
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboardAdmin/users"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100 focus:bg-green-300"
                  >
                    <FaRegUser className="size-4" />
                    User
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboardAdmin/configForm"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100 focus:bg-green-300"
                  >
                    <svg
                      className="size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Config
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hover:bg-[#232323] bg-neutral-600 flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg w-full mb-2">
              {isSunny ? (
                <>
                  <IoMdSunny className="size-4 text-white hover:text-yellow-400 hover:rotate-90 transition-transform duration-300 ease-in-out" />
                  <span>Dark mode</span>
                </>
              ) : (
                <>
                  <FaRegMoon
                    className={`size-4 text-white hover:text-blue-700 transition-all duration-300 ease-in-out ${isRotated ? "" : "rotate-180"
                      }`}
                  />
                  <span>Light mode</span>
                </>
              )}

              <label className="inline-flex items-center cursor-pointer ml-auto">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </nav>


        </div>
      </div>
    </div>
  );
}
