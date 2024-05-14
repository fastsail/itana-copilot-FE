'use client';

import { User } from '@workos-inc/node';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthResponse = { isAuthenticated: boolean; user: User | null } | { isAuthenticated: false; user?: User };

export function useAuth() {
    const router = useRouter();
    const [authUrl, setAuthUrl] = useState<string | null>(null);
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async <T>(url: string, setDataCallback: React.Dispatch<React.SetStateAction<T | null>>) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}`);
            }
            const responseData = await response.json();
            if (responseData && responseData.user) {
                setDataCallback(responseData);
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAuthUrl = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/auth_url');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data from /api/auth_url: ${response.statusText}`);
                }
                const responseData = await response.json();
                setAuthUrl(responseData);
            } catch (error) {
                console.error('Error fetching auth URL:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthUrl();
    }, []);

    useEffect(() => {
        fetchData<AuthResponse>('/api/get_user', setUser);
    }, []);

    const logout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/logout');
            const responseData = await response.json();

            if (responseData?.success) {
                setLoading(false);
                router.push('/');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            setLoading(false);
        }
    };

    return { authUrl, userObject: user, loading, logout };
}