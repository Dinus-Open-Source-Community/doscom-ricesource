"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/actions/authAdmin";

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await adminLogin({email,password})

      if (!response) {
        setError( true);
        return;
      }
  
      localStorage.setItem("token", response.token);
      router.push("/dashboardAdmin");
    } catch (err) {
      setError(true);
    }
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="bg-gray-100 flex min-h-screen items-center justify-center flex-wrap shadow-md">
      <div className="max-w-5xl w-full rounded-3xl shadow bg-[url('/image/placeholder-card.png')] p-4 h-full flex gap-4 bg-cover bg-center">
        <div className="">
          <p className="text-white">Admin</p>
        </div>
        <div className="bg-gray-100 p-24 rounded-lg w-1/2 text-center ml-auto">
          <div className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700 p-6">
            <div className="flex items-center justify-center pb-5">
              <img src="Group.svg" className="w-14" alt="" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black mb-6 text-center whitespace-nowrap">
              Sign in to your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black dark:text-black text-left"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-blackGray border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500">Enter Valid Email</p>}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-black text-left"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="bg-blackGray border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                                  {error && <p className="text-red-500">Enter Valid Email</p>}

                  <img
                    src={passwordVisible ? "close-eye.svg" : "open-eye.svg"}
                    alt="Toggle Visibility"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>

              <button
                type="submit"

                className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
