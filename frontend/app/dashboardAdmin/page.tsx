import React from "react";
import TopBar from "@/components/admin/topBar";

export default function AdminDashboardPage() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:ml-64">
        <div className="p-4 h-screen  rounded-lg dark:border-gray-700">
          {/* Horizontal line with spacing */}
          {/* <hr className="border-t border-gray-300 my-2" /> */}

          <h1 className="text-2xl font-bold">DashBoard</h1>
          <p className="my-2 text-sm">Admin of RiceSource, manage people</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="relative border border-gray-400 py-20 rounded-xl">
              <h1 className="absolute top-2 left-2">Update</h1>
            </div>
            <div className="relative border border-gray-400 py-20 rounded-xl">
              <h1 className="absolute top-2 left-2">Total user</h1>
            </div>
            <div className="relative border border-gray-400 py-20 rounded-xl">
              <h1 className="absolute top-2 left-2">Total Revenue</h1>
            </div>
          </div>

          <div className="grid grid-flow-col-dense">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="relative border border-gray-400 py-40 rounded-xl">
                <h1 className="absolute top-2 left-2">view table Form</h1>
              </div>
              <div className="relative border border-gray-400 py-20 rounded-xl">
                <h1 className="absolute top-2 left-2">view table User</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}