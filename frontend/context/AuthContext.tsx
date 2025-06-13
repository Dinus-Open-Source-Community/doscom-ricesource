"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { logout } from '@/actions/auth';

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => { },
    isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const validateToken = async () => {
            if (!storedToken || !storedUser) {
                setIsLoading(false);
                console.log(pathname);

                if (/^\/ricesource\/(manage|bookmark)(\/.*)?$/.test(pathname)) {
                    router.push('/login');
                }
                return;
            }

            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userauth/verify`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        }
                    }
                );
                setToken(storedToken); // valid token
                setUser(storedUser)

                // Tambahkan pengecekan jika berada di halaman login, redirect ke /admin
                if (pathname === '/login') {
                    router.push('/');
                }
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                await logout();
                setToken(null);


                if (pathname === '/ricesource/manage' || pathname === '/ricesource/bookmark/') {
                    router.push('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [pathname, router]);

    const value = {
        token,
        setToken: (newToken: string | null) => {
            if (newToken) {
                localStorage.setItem('token', newToken);
            } else {
                localStorage.removeItem('token');
            }
            setToken(newToken);
        },
        user,
        setUser: (newUser: string | null) => {
            if (newUser) {
                localStorage.setItem('user', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user');
            }
            setUser(newUser);
        },
        isLoading,
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);