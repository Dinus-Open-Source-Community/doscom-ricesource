import React from "react";
import { FaPlus } from "react-icons/fa";

const DashboardAdmin = () => {
    return (
    <div className="flex-1  mr-4 mb-2 mt-2">
        <div>
            <button className="border border-[#1E1E1E] w-52 h-24 rounded-lg mt-4 mr-6 transform transition-transform duration-300 ease-out hover:scale-105">
                <div className="flex flex-col items-start ml-4">
                    <FaPlus className="text-gray-400 w-4 h-4 mb-4"/>
                    <span className="text-[#717171]">New form</span>
                </div>
            </button>

            <button className="border border-[#1E1E1E] w-52 h-24 rounded-lg mt-4 mr-6 transform transition-transform duration-300 ease-out hover:scale-105">
                <div className="flex flex-col items-start ml-4">
                    <FaPlus className="text-gray-400 w-4 h-4 mb-4"/>
                    <span className="text-[#717171]">New form</span>
                </div>
            </button>
        </div>

        <div className="my-4">
        <span className="font-semibold text-white">This month progress</span>
        </div>

        {/* widget */}
        <div className="grid grid-rows-2 gap-4 grid-flow-col mt-8">
            <div className="flex gap-4">
                {/* top left */}
                <div className="transform transition-transform duration-300 ease-out hover:scale-105">
                    <div className="max-w-[400px] h-[300px] p-6 border border-gray-600 rounded-lg bg-blue-700 gap-2">
                        <label className="text-white text-2xl font-bold mb-2 tracking-tight dark:text-white">
                            halo
                        </label>
                        <p className="text-white mb-3 font-normal">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order aa
                        </p>
                    </div>
                </div>

                {/* top right */}
                <div className="transform transition-transform duration-300 ease-out hover:scale-105">
                    <div className="max-w-[684px] h-[260px] p-6 border border-gray-600 rounded-lg bg-blue-700 gap-2">
                        <label className="text-white text-2xl font-bold mb-2 tracking-tight dark:text-white">
                            halo
                        </label>
                        <p className="text-white mb-3 font-normal">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order xx s
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {/* bottom left */}
                <div className="transform transition-transform duration-300 ease-out hover:scale-105">
                    <div className="max-w-[400px] h-[260px] p-6 border border-gray-600 rounded-lg bg-blue-700 gap-2">
                        <label className="text-white text-2xl font-bold mb-2 tracking-tight dark:text-white">
                            halo
                        </label>
                        <p className="text-white mb-3 font-normal">
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order aa
                        </p>
                    </div>
                </div>

                {/* bottom right */}
                <div className="flex gap-4">
                    <div className="transform transition-transform duration-300 ease-out hover:scale-105">
                        <div className="max-w-[334px] h-[300px] p-6 border border-gray-600 rounded-lg bg-blue-700 gap-2 -mt-10">
                            <label className="text-white text-2xl font-bold mb-2 tracking-tight dark:text-white">
                                halo
                            </label>
                            <p className="text-white mb-3 font-normal">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order aa
                            </p>
                        </div>
                    </div>

                    <div className="transform transition-transform duration-300 ease-out hover:scale-105">
                        <div className="max-w-[334px] h-[300px] p-6 border border-gray-600 rounded-lg bg-blue-700 gap-2 -mt-10">
                            <label className="text-white text-2xl font-bold mb-2 tracking-tight dark:text-white">
                                halo
                            </label>
                            <p className="text-white mb-3 font-normal">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order aa
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    );
};

export default DashboardAdmin;
