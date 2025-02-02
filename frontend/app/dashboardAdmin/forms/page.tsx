'use client'
import React, { useState } from 'react';

const FormsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const users = [
    {
      id: 1,
      profile: "/image/rapi.jpg",
      email: "john.doe@example.com",
      username: "johndoe",
      comment: "Active user since 2023"
    },
    {
      id: 2,
      profile: "/image/rapi.jpg",
      email: "sarah.smith@example.com",
      username: "sarahsmith",
      comment: "Premium member"
    },
    {
      id: 3,
      profile: "/image/rapi.jpg",
      email: "mike.jones@example.com",
      username: "mikejones",
      comment: "New user"
    },
    {
      id: 4,
      profile: "/image/rapi.jpg",
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

  return (
    <div className="p-4 sm:ml-64">
      {/* Header Section */}
      <div className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg">
        <div>
          <h1 className="font-semibold text-xl text-gray-800"> Forms table</h1>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Create
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Export
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Delete
          </button>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={user.profile}
                    alt={user.username}
                    className="h-10 w-10 rounded-full"
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
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === index + 1
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

export default FormsTable;