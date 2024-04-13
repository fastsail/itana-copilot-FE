/**
 |--------------------------------------------------
 | Imports
 |--------------------------------------------------
 */
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';

interface AccountProps {
	email: string;
	logout: () => void;
};

export default function Account({email, logout}: AccountProps) {
	return (
		<div className='flex flex-col gap-8'>
			{/**
			|--------------------------------------------------
			| Note Template
			|--------------------------------------------------
			*/}
			<div className='flex justify-between flex-wrap gap-4 items-center w-full max-w-[600px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Email address</span>
				</div>
				<div className='w-[70%] flex flex-row justify-end'>
					<div className='flex h-10 border rounded-md w-full  bg-slate-100 px-4 sm:mx-2 mr-2'>
						<span className='font-light text-slate-600 truncate text-sm flex items-center justify-center'>
							{email ? email : 'No Email Found'}
						</span>
					</div>
					<button type='button' onClick={logout} className='hover:scale-95 transition-transform  flex h-10 items-center border rounded-md w-full max-w-max px-4'>
						<span className='font-light text-rose-600 text-sm flex items-center justify-center'>Logout</span>
					</button>
				</div>
			</div>

			{/**
			|--------------------------------------------------
			| Subscription
			|--------------------------------------------------
			*/}
			<div className='flex justify-between flex-wrap gap-4 items-start w-full max-w-[600px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Subscription</span>
				</div>
				<div className='w-max'>
					<div className={cn('h-[52px] w-full rounded-md font-light flex-col text-end  flex text-sm')}>
						<span className='font-medium'>Free Plan</span>
						<span className='text-slate-600 text-xs'>Limited to 30 encounters per month</span>
					</div>
					<button
						type='button'
						className={cn(
							button_styles,
							'h-[42px] w-max gap-4 ml-auto rounded-md px-6 font-light text-white bg-black border border-slate-700 flex items-center justify-center text-sm'
						)}
					>
						Upgrade to $119 per month
					</button>
				</div>
			</div>

			{/**
			|--------------------------------------------------
			| Personal Informantion
			|--------------------------------------------------
			*/}
			<div className='flex justify-between flex-wrap gap-4 items-start w-full max-w-[600px] gap-x-8 border-b pb-6'>
				<div className='flex flex-col gap-1 max-w-[180px]'>
					<span className='text-sm font-semibold'>Personal information</span>
					<span className='text-xs font-light'>
						This information will appear in letters and patient notes
					</span>
				</div>
				<div className='w-full'>
					<textarea
						placeholder={`Dr Eric Smith`}
						className={cn(
							'min-h-[200px] resize-none w-full ml-auto rounded-md p-4 font-light text-black border border-slate-300 flex items-center justify-center text-sm'
						)}
					/>
				</div>
			</div>
		</div>
	);
}
