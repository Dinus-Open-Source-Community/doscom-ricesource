'use client'
import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useRouter } from 'next/navigation'

import { CreateAdmin } from "@/components/admin/modalAddAdmin";
import { DeleteAdmin } from "@/components/admin/modalDeleteAdmin";

const userAdminTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const users = [
    {
      id: 1,
      profile: "/image/default-user-preview.png",
      email: "john.doe@example.com",
      username: "johndoe",
      comment: "Active user since 2023"
    },
    {
      id: 2,
      profile: "/image/default-user-preview.png",
      email: "sarah.smith@example.com",
      username: "sarahsmith",
      comment: "Premium member"
    },
    {
      id: 3,
      profile: "/image/default-user-preview.png",
      email: "mike.jones@example.com",
      username: "mikejones",
      comment: "New user"
    },
    {
      id: 4,
      profile: "/image/default-user-preview.png",
      email: "emma.wilson@example.com",
      username: "emmawilson",
      comment: "Inactive"
    }
  ];

  const stats = {
    today: "245",
    totalUsers: "1,234",
    totalHuman: "987",
    other: "432"
  };

  // Search functionality
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  const router = useRouter()

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg">
        <h1 className="font-semibold text-xl text-gray-800">User Admin</h1>

        <div className="flex gap-4">
            <CreateAdmin />
        </div>
      </div>


      {/* Stats Section */}
      <div className="bg-white shadow-md w-full mt-4 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Today</div>
            <div className="text-xl font-bold text-blue-600">{stats.today}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-xl font-bold text-green-600">{stats.totalUsers}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Human</div>
            <div className="text-xl font-bold text-purple-600">{stats.totalHuman}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Other</div>
            <div className="text-xl font-bold text-orange-600">{stats.other}</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4 bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={user.profile}
                    alt={user.username}
                    className="h-10 w-10 rounded-full bg-gray-200"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.comment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                    onClick={() => router.push('/dashboardAdmin/userAdmin/${userId}')}
                  >
                    <MdOutlineEdit size={20} className='text-orange-500' />
                    <span className='text-orange-500'>Edit</span>
                  </button>

                  <DeleteAdmin />

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                // onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  //   onClick={() => handlePageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === index + 1
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                // onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userAdminTable;