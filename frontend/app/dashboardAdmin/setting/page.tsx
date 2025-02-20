"use client"
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { LuUserRound } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

interface UserProfile {
    name: string
    email: string
    bio: string
    avatar: string
    password: string
    newPassword: string
}

export default function AdminSettings() {
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Jembud ayam kuda',
        email: 'joni@www.com',
        bio: 'Aku suka sekali dengan surya 16, ini adalah penyemangatku.',
        avatar: '',
        password: '',
        newPassword: '',
    })

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Profile updated:', profile)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

            <form onSubmit={handleSubmit} className="bg-white  rounded-lg p-6">
                <div className="md:flex items-center gap-8 mb-8">
                    <div className="mb-4 md:mb-0">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {profile.avatar ? (
                                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img
                                    src="/image/default-user-preview.png"
                                    alt="Default Avatar"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Change Avatar
                        </button>
                        <p className="mt-2 text-sm text-gray-500">
                            JPG, GIF or PNG. 1MB max.
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                {/* Icon */}
                                <LuUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {/* Input Field */}
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className='relative'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className='relative'>
                                <MdOutlineEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Password</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                value={profile.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div
                                className="absolute right-3 top-10 w-6 h-6 cursor-pointer text-gray-500"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={profile.newPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
