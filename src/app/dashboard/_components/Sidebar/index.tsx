'use client';

import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import { Clock, Envelope, Installation, Microphone, Settings } from '@/assets/icons';
import ItanaLogo from '@/assets/images/itana-copilot.png';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { getCurrentLocalTime } from './currentLocalTime';

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

const sidebar_data_aux = [
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
	// current local time
	const time = getCurrentLocalTime();
	//
	const pathname = usePathname();
	const [isActivePage, setIsActivePage] = React.useState<string>(pathname);
	const { consultationViews, setShowSidebar, showSidebar } = useDashboardStateChange();
	//
	React.useEffect(() => {
		setIsActivePage(pathname);
	}, [pathname]);
	//
	//
	return (
		<aside
			className={cn(
				'md:sticky fixed z-[50] top-0 min-w-[260px] border-r h-screen bg-white transition-transform md:flex flex-col justify-start',
				showSidebar ? 'translate-x-0' : 'md:translate-x-0 -translate-x-[150vw]'
			)}
		>
			<div className='w-full h-[120px] border-b flex items-center px-8'>
				<Image src={ItanaLogo} alt='itana logo' />
			</div>

			{/**
			|--------------------------------------------------
			| Consultation Card... Shows only when consultation has started
			|--------------------------------------------------
			*/}

			{consultationViews === 'transcript-view' && (
				<div className='px-8 py-5 mt-4 md:mt-0'>
					<h1 className='font-semibold text-xs md:text-sm'>Today</h1>

					<div
						className={cn(
							'flex p-3 my-3 flex-col text-xs md:text-sm rounded-md hover:bg-[#EEFAEB] hover:text-[#36A477] transition-all items-start font-light text-[#36A477] bg-[#EEFAEB]'
						)}
					>
						<span className='font-medium'>Current Consultation</span>
						<span className='text-[#558270]'>{time} - 2min</span>
					</div>
				</div>
			)}

			{/**
			|--------------------------------------------------
			| Shows only when consultation has not started
			|--------------------------------------------------
			*/}
			{consultationViews === 'default' && (
				<div className='px-5 py-6'>
					{sidbar_data.map((item) => (
						<Link
							onClick={() => showSidebar && setShowSidebar(false)}
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
			)}

			{/**
			|--------------------------------------------------
			| Chrome extension installation
			|--------------------------------------------------
			*/}
			{/* <div
				className={cn(
					'mt-[70%] md:mt-auto flex items-center relative justify-center',
					consultationViews === 'transcript-view' ? 'mb-2' : 'mb-24'
				)}
			>
				<Installation className='absolute -translate-x-1/2 left-1/2 -top-[35px]' />
				<div className='h-[176px] gap-2 w-[202px] flex flex-col p-4 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F3FEE8] to-[#ECFEF7]'>
					<h1 className='font-semibold text-sm mt-8'>Try chrome extension</h1>
					<p className='text-xs font-light'>One line benefits here</p>

					<button
						onClick={() => showSidebar && setShowSidebar(false)}
						className='bg-[#DDF9C1] mt-auto text-xs px-6 py-3 rounded-md'
						type='button'
					>
						Install Now
					</button>
				</div>
			</div> */}

			{/**
			|--------------------------------------------------
			| Shows when consultation has started
			|--------------------------------------------------
			*/}
			{consultationViews === 'transcript-view' && (
				<div className='px-5 py-6'>
					{sidebar_data_aux.map((item) => (
						<Link
							onClick={() => showSidebar && setShowSidebar(false)}
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
			)}
		</aside>
	);
}
