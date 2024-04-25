'use client';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '../useAuth';
import React from 'react';

interface SignInProps{
	title?: string
}
export function SignInButton({title ="Sign In"}: SignInProps) {
	const {authUrl, loading, userObject } = useAuth();

	// React.useEffect(() => {
	// 	console.log('Auth url : ', authUrl);
	// 	console.log('User Object : ', userObject?.isAuthenticated);
	// }, [authUrl, userObject?.isAuthenticated])

	if (userObject?.isAuthenticated) {
		return (
			<Link href={"/dashboard/current-consultation"} legacyBehavior passHref>
				<span
					className={cn(
						button_styles,
						'font-light bg-[#36A477] h-[40px] px-12 text-white flex items-center justify-center text-sm'
					)}
				>
					{title}
				</span>
			</Link>
		);
	}

	if(!loading){
		return (
			<Link href={authUrl || "/"} legacyBehavior passHref>
				<span
					className={cn(
						button_styles,
						'font-light bg-[#36A477] h-[40px] px-12 text-white flex items-center justify-center text-sm'
					)}
				>
					{title}
				</span>
			</Link>
		);
	}
}

