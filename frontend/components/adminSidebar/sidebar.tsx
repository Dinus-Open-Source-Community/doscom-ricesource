"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { FaTable } from "react-icons/fa6";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { FaUserGear } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className=''>
      <div className="lg:hidden py-16 text-center">
        <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-sidebar-header" aria-label="Toggle navigation" data-hs-overlay="#hs-sidebar-header">
          Open
        </button>
      </div>

      <div id="hs-sidebar-header" className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-[60] bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700" role="dialog" aria-label="Sidebar" >
        <div className="relative flex flex-col h-full max-h-full ">
          <header className="p-4 flex justify-between items-center gap-x-2">
            <div className="flex space-x-2">
              <a
                className="flex items-center font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
                href="#"
                aria-label="RiceSource"
              >
                <img src="Group.svg" className="w-8 h-8" alt="Globe Icon" />
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
              <button id="hs-sidebar-header-example-with-dropdown" type="button" className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <img className="shrink-0 size-5 rounded-full" src="/image/rapi.jpg" alt="Avatar" />
                Raffy Attala
                <svg className="shrink-0 size-3.5 ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></svg>
              </button>

              <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700" role="menu" aria-orientation="vertical" aria-labelledby="hs-sidebar-header-example-with-dropdown">
                <div className="p-1">
                  <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-green-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    My account
                  </a>
                  <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-green-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                    Settings
                  </a>
                  {/* <a className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 " href="#">
                    Sign out
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="hs-accordion-group pb-0 px-2 pt-2 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="../dashboardAdmin/"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-black focus:bg-gray-100 active:bg-gray-200 dark:hover:bg-neutral-700 dark:focus:ring-black dark:focus:bg-neutral-700 dark:active:bg-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    Dashboard
                  </Link>
                </li>

                <li>
                  <a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100" href="#">
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                    Calendar
                  </a>
                </li>

                <li>
                  <Link
                    href="../dashboardAdmin/form"
                    className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-green-100"
                  >
                    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Form
                  </Link>
                </li>

                <li>
                  <a className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-red-600 hover:text-white" href="#">
                    <BiLogOutCircle className=" w-[17px] h-[17px]" />
                    Logout
                  </a>
                </li>
                {/* <input type="checkbox" id="hs-basic-usage" className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-blue-200" />
                <label htmlFor="hs-basic-usage" className="sr-only">switch</label> */}
              </ul>
            </div>

          </nav>
        </div>
      </div>
    </div>
  );
}
