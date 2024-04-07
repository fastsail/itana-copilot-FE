'use client';
import { GenderIntersex, Magicwand, Menu, Microphone, Refresh, Settings, Star } from '@/assets/icons';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Notes() {
	//
	const [showPause, setShowPause] = React.useState<boolean>(false);
	const router = useRouter();
	//
	return (
		<div className='h-full overflow-y-auto'>
			{/**
			|--------------------------------------------------
			|	I am not sure how this works though...
			|--------------------------------------------------
			*/}
			<div className={cn('bg-[#36A477] px-8 py-2 mb-4 w-full flex items-center justify-between rounded-md')}>
				<span className='text-white text-sm font-light'>
					Note generated with the “Detailed sections” template.
				</span>
				<button
					onClick={() => router.push('/dashboard/settings')}
					className={cn(
						button_styles,
						'bg-[#EEFAEB] flex items-center justify-center gap-2 rounded-md text-sm font-light'
					)}
					type='button'
				>
					<Settings /> <span>Settings</span>
				</button>
			</div>

			{/**
			|--------------------------------------------------
			| Toolkit by the right
			|--------------------------------------------------
			*/}

			<div className='w-[52px] flex flex-col border rounded-md fixed items-center right-8'>
				<button
					className={cn(button_styles, 'size-10 flex items-center justify-center border-b')}
					type='button'
				>
					<Magicwand />
				</button>
				<button
					className={cn(button_styles, 'size-10 flex items-center justify-center border-b')}
					type='button'
				>
					<GenderIntersex />
				</button>
				<button
					className={cn(button_styles, 'size-10 flex items-center justify-center border-b')}
					type='button'
				>
					<Refresh />
				</button>
			</div>

			{/**
			|--------------------------------------------------
			| Free text area
			|--------------------------------------------------
			*/}
			<div className='flex items-center gap-4 h-8'>
				<h1 className='capitalize ml-7 text-sm font-medium'>Free text</h1>
				<div className='flex items-center gap-3 border-l px-6'>
					<button title='Dictate' className={cn(button_styles, 'h-max p-0')} type='button'>
						<Microphone />
					</button>
					<button title='Copy section' className={cn(button_styles, 'h-max p-0')} type='button'>
						<Copy size={15} />
					</button>
				</div>
			</div>

			<textarea
				className='w-[90%] ml-1 outline-none p-6 resize-none text-sm placeholder:font-light placeholder:text-sm font-light'
				placeholder='Enter your text...'
			/>

			{/**
			|--------------------------------------------------
			| Bottom CTA Buttons
			|--------------------------------------------------
			*/}
			<div className='flex justify-end items-center gap-[1px] bottom-24 fixed right-8 w-[calc(100%_-_324px)]'>
				{/* Rate this note */}
				<button
					className={cn(
						button_styles,
						'text-sm font-light bg-[#F6F7F8] mr-auto border rounded-md text-black h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8'
					)}
					type='button'
				>
					<span>Rate this note</span>
					<div className='flex items-center gap-2'>
						{[...Array(5)].map((_item, index) => (
							<span key={index}>
								<Star />
							</span>
						))}
					</div>
				</button>

				{/**
				|--------------------------------------------------
				| Patient instructions button
				|--------------------------------------------------
				*/}
				<button
					className={cn(
						button_styles,
						'text-sm font-light mr-6 border rounded-md text-black h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8'
					)}
					type='button'
				>
					<span>
						<Menu />
					</span>
					<span className='font-light'>Patient Instructions</span>
				</button>

				{/**
				|--------------------------------------------------
				| Copy notes button
				|--------------------------------------------------
				*/}
				<button
					type='button'
					className={cn(
						button_styles,
						'bg-[#36A477] text-sm font-light text-white h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8'
					)}
				>
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M12.375 3H1.125C0.95924 3 0.800269 3.06585 0.683058 3.18306C0.565848 3.30027 0.5 3.45924 0.5 3.625V14.875C0.5 15.0408 0.565848 15.1997 0.683058 15.3169C0.800269 15.4342 0.95924 15.5 1.125 15.5H12.375C12.5408 15.5 12.6997 15.4342 12.8169 15.3169C12.9342 15.1997 13 15.0408 13 14.875V3.625C13 3.45924 12.9342 3.30027 12.8169 3.18306C12.6997 3.06585 12.5408 3 12.375 3ZM11.75 14.25H1.75V4.25H11.75V14.25ZM15.5 1.125V12.375C15.5 12.5408 15.4342 12.6997 15.3169 12.8169C15.1997 12.9342 15.0408 13 14.875 13C14.7092 13 14.5503 12.9342 14.4331 12.8169C14.3158 12.6997 14.25 12.5408 14.25 12.375V1.75H3.625C3.45924 1.75 3.30027 1.68415 3.18306 1.56694C3.06585 1.44973 3 1.29076 3 1.125C3 0.95924 3.06585 0.800269 3.18306 0.683058C3.30027 0.565848 3.45924 0.5 3.625 0.5H14.875C15.0408 0.5 15.1997 0.565848 15.3169 0.683058C15.4342 0.800269 15.5 0.95924 15.5 1.125Z'
							fill='white'
						/>
					</svg>

					<span>Copy note</span>
				</button>

				<button
					onClick={() => setShowPause(!showPause)}
					type='button'
					className={cn(
						button_styles,
						'bg-[#36A477] text-sm font-light text-white py-3 h-[48px] rounded-r-md flex items-center gap-2 px-8'
					)}
				>
					<span className={cn('transition-all', showPause ? '-rotate-180' : '')}>
						<svg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M11.3538 1.35378L6.35378 6.35378C6.30735 6.40027 6.2522 6.43715 6.1915 6.46231C6.13081 6.48748 6.06574 6.50043 6.00003 6.50043C5.93433 6.50043 5.86926 6.48748 5.80856 6.46231C5.74786 6.43715 5.69272 6.40027 5.64628 6.35378L0.646284 1.35378C0.552464 1.25996 0.499756 1.13272 0.499756 1.00003C0.499756 0.867352 0.552464 0.740104 0.646284 0.646284C0.740104 0.552463 0.867352 0.499756 1.00003 0.499756C1.13272 0.499756 1.25996 0.552463 1.35378 0.646284L6.00003 5.29316L10.6463 0.646284C10.6927 0.599829 10.7479 0.562978 10.8086 0.537837C10.8693 0.512696 10.9343 0.499756 11 0.499756C11.0657 0.499756 11.1308 0.512696 11.1915 0.537837C11.2522 0.562978 11.3073 0.599829 11.3538 0.646284C11.4002 0.692739 11.4371 0.747889 11.4622 0.808586C11.4874 0.869282 11.5003 0.934336 11.5003 1.00003C11.5003 1.06573 11.4874 1.13079 11.4622 1.19148C11.4371 1.25218 11.4002 1.30733 11.3538 1.35378Z'
								fill='white'
							/>
						</svg>
					</span>
				</button>
			</div>
		</div>
	);
}
