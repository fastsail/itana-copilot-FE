'use client';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '../useAuth';
import React from 'react';

export function SignInButton() {
	const {authUrl, loading } = useAuth();

	React.useEffect(() => {
		console.log('Auth url : ', authUrl);
	}, [authUrl])

	if (false) {
		return (
			<button type='button'>
				<span
					className={cn(
						button_styles,
						'font-light bg-[#36A477] h-[40px] px-12 text-white flex items-center justify-center text-sm'
					)}
				>
					Sign Out
				</span>
			</button>
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
					Sign Up Now
				</span>
			</Link>
		);
	}
}
