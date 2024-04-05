'use client';

import { Clock, Envelope, Installation, Microphone, Settings } from '@/assets/icons';
import ItanaLogo from '@/assets/images/itana-copilot.png';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
|--------------------------------------------------
|  Side bar data
|--------------------------------------------------
*/
const sidbar_data = [
	{
		label: 'Current Consultation',
		icon: Microphone,
		href: '/dashboard/current-consultation',
	},
	{
		label: 'Past Consultation',
		icon: Clock,
		href: '/dashboard/past-consultation',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/dashboard/settings',
	},
	{
		label: 'Contact Us',
		icon: Envelope,
		href: '/dashboard/contact',
	},
];

//
export default function Sidebar() {
	//
	const pathname = usePathname();
	const [isActivePage, setIsActivePage] = React.useState<string>(pathname);
	//
	React.useEffect(() => {
		setIsActivePage(pathname);
	}, [pathname]);
	//
	return (
		<aside className='sticky top-0 min-w-[260px] border-r h-screen flex flex-col justify-between'>
			<div className='w-full h-[120px] border-b flex items-center px-8'>
				<Image src={ItanaLogo} alt='itana logo' />
			</div>

			<div className='px-5 py-6'>
				{sidbar_data.map((item) => (
					<Link
						key={item.href}
						className={cn(
							'flex p-3 my-3 text-sm rounded-md hover:bg-[#EEFAEB] hover:text-[#36A477] transition-all items-center gap-4 font-light',
							isActivePage === item.href && 'text-[#36A477] bg-[#EEFAEB]'
						)}
						href={item.href}
					>
						<item.icon color={isActivePage === item.href ? '#36A477' : '#1E3337'} /> {item.label}
					</Link>
				))}
			</div>

			<div className='mb-24 mt-auto flex items-center relative justify-center'>
				<Installation className='absolute -translate-x-1/2 left-1/2 -top-[35px]' />
				<div className='h-[176px] gap-2 w-[202px] flex flex-col p-4 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F3FEE8] to-[#ECFEF7]'>
					<h1 className='font-semibold text-sm mt-8'>Try chrome extension</h1>
					<p className='text-xs font-light'>One line benefits here</p>

					<button className='bg-[#DDF9C1] mt-auto text-xs px-6 py-3 rounded-md' type='button'>
						Install Now
					</button>
				</div>
			</div>
		</aside>
	);
}
