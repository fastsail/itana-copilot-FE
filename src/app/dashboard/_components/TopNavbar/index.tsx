'use client';

import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import { button_styles } from '@/constants/global.const';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { Settings, Settings2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function TopNavigation() {
	/**
	|--------------------------------------------------
	| Dashboard functions
	|--------------------------------------------------
	*/
	const {
		activeView,
		settingsView,
		consultationViews: viewState,
		setActiveView,
		setActiveSettingsView,
		setConsultationView: setViewState,
		showSidebar,
		setShowSidebar,
	} = useDashboardStateChange();

	const sidebarRef = useClickOutside({ callback: () => setShowSidebar(false) });

	/**
	|--------------------------------------------------
	| Tab Views
	|--------------------------------------------------
	*/
	const tabViews = ['Transcript', 'Note'];
	const settingsTabView = ['General', 'Note', 'Account'];
	/**
	|--------------------------------------------------
	| custom hooks
	|--------------------------------------------------
	*/
	const pathname = usePathname();
	const router = useRouter();

	return (
		<nav
			ref={sidebarRef}
			className='top-0 sticky bg-white h-[140px] z-50 border-b w-full flex-col justify-between items-center flex p-6 pb-0'
		>
			<div className='w-full flex items-center justify-between'>
				<button
					onClick={() => setShowSidebar(!showSidebar)}
					className='md:hidden flex rounded-full h-10 w-10 items-center justify-center mr-6 bg-slate-100'
					type='button'
				>
					<Settings2 size={19} />
				</button>
				{/*  */}
				<h1 className='font-semibold text-xl md:text-3xl'>Consultation</h1>

				<button
					title='New Consultation'
					onClick={() => {
						router.push('/dashboard/current-consultation');
						setViewState('default');
					}}
					type='button'
					className={cn(
						button_styles,
						'bg-[#EEFAEB] ml-auto text-[#36A477] font-medium text-sm flex justify-center items-center gap-4 h-[52px] md:w-max w-[52px] rounded-full md:rounded-md'
					)}
				>
					<span className='w-[18px]'>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M15.5 8C15.5 8.16576 15.4342 8.32473 15.3169 8.44194C15.1997 8.55915 15.0408 8.625 14.875 8.625H8.625V14.875C8.625 15.0408 8.55915 15.1997 8.44194 15.3169C8.32473 15.4342 8.16576 15.5 8 15.5C7.83424 15.5 7.67527 15.4342 7.55806 15.3169C7.44085 15.1997 7.375 15.0408 7.375 14.875V8.625H1.125C0.95924 8.625 0.800269 8.55915 0.683058 8.44194C0.565848 8.32473 0.5 8.16576 0.5 8C0.5 7.83424 0.565848 7.67527 0.683058 7.55806C0.800269 7.44085 0.95924 7.375 1.125 7.375H7.375V1.125C7.375 0.95924 7.44085 0.800269 7.55806 0.683058C7.67527 0.565848 7.83424 0.5 8 0.5C8.16576 0.5 8.32473 0.565848 8.44194 0.683058C8.55915 0.800269 8.625 0.95924 8.625 1.125V7.375H14.875C15.0408 7.375 15.1997 7.44085 15.3169 7.55806C15.4342 7.67527 15.5 7.83424 15.5 8Z'
								fill='#5BC17F'
							/>
						</svg>
					</span>
					<span className='md:inline hidden'>New Consultation</span>
				</button>
			</div>

			{/**
			|--------------------------------------------------
			| Consultation View
			|--------------------------------------------------
			*/}
			{!pathname.includes('/current-consultation') ? null : viewState === 'default' ? null : (
				<div className='w-full flex gap-8'>
					{tabViews.map((tab) => (
						<button
							onClick={() => setActiveView(tab as any)}
							className={cn(
								'text-sm font-light px-4 pb-1',
								activeView === tab && 'border-b-2 border-b-[#36A477]'
							)}
							key={tab}
						>
							{tab}
						</button>
					))}
				</div>
			)}
			{/**
			|--------------------------------------------------
			| Settings tabview
			|--------------------------------------------------
			*/}
			{!pathname.includes('/settings') ? null : (
				<div className='w-full flex gap-4 md:gap-8'>
					{settingsTabView.map((tab) => (
						<button
							onClick={() => setActiveSettingsView(tab as any)}
							className={cn(
								'text-sm font-light px-4 pb-1',
								settingsView === tab && 'border-b-2 border-b-[#36A477]'
							)}
							key={tab}
						>
							{tab}
						</button>
					))}
				</div>
			)}
		</nav>
	);
}
