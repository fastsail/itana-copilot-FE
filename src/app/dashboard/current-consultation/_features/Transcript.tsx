'use client';

import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import { useUserStore } from '@/app/zustand/useUserState';
import { button_styles } from '@/constants/global.const';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { Pause, PauseCircleIcon } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const dummyResponse = [
	{ time_stamp: '00:03', text: 'mollit pariatur irure anim incididunt reprehenderit magna proident' },
	{
		time_stamp: '00:07',
		text: 'tempor amet exercitation sunt consequat veniam nulla proident consequat incididunt dolore',
	},
	{ time_stamp: '00:11', text: 'in incididunt laboris fugiat adipisicing deserunt exercitation' },
	{
		time_stamp: '00:16',
		text: 'consequat exercitation officia reprehenderit do culpa eiusmod non pariatur in veniam consequat velit ullamco',
	},
	{ time_stamp: '00:21', text: 'nostrud ad deserunt est consectetur in ipsum' },
	{ time_stamp: '00:25', text: 'reprehenderit amet consectetur laborum consectetur dolor do magna' },
	{ time_stamp: '00:30', text: 'ex adipisicing consequat aute consequat nisi proident adipisicing laboris' },
	{ time_stamp: '00:34', text: 'amet deserunt exercitation aute proident aliquip ut incididunt' },
	{ time_stamp: '00:38', text: 'exercitation ad magna veniam laboris commodo culpa exercitation deserunt dolor' },
	{ time_stamp: '00:43', text: 'proident ex labore in aliqua ipsum' },
	{ time_stamp: '00:47', text: 'cillum anim veniam reprehenderit reprehenderit veniam' },
	{ time_stamp: '00:52', text: 'non adipisicing quis occaecat fugiat' },
	{ time_stamp: '00:57', text: 'tempor mollit dolore ut aliquip consectetur consequat voluptate' },
	{ time_stamp: '01:01', text: 'irure dolor amet non culpa' },
	{ time_stamp: '01:06', text: 'nulla do eiusmod in laboris ullamco' },
	{ time_stamp: '01:11', text: 'aute in elit consectetur dolore' },
	{ time_stamp: '01:16', text: 'dolor cillum aliqua consequat eiusmod nulla dolor sint' },
	{ time_stamp: '01:20', text: 'velit amet deserunt deserunt in exercitation' },
	{ time_stamp: '01:25', text: 'consequat ad do aliquip' },
	{ time_stamp: '01:30', text: 'consequat reprehenderit incididunt in' },
];

export default function Transcript() {
	//
	const router = useRouter();
	const [showPause, setShowPause] = React.useState<boolean>(false);
	const pauseRef = useClickOutside({ callback: () => setShowPause(false) });
	const { setActiveView, setActiveSettingsView, setConsultationLimitExceeded } = useDashboardStateChange();
	const {user} = useUserStore();
	//
	const handleGenerateNotes = async () => {
		const userId = user?.uid;

		if (userId) {
			//-- Increment consultation count here --//
			const response = await fetch(`/api/increment_consultation?userId=${userId}`);
			const data = await response.json();
			console.log('Data : ', data);
			const limitedExceeded = data.data.limitExceeded
			console.log("Limit exceeded: ", limitedExceeded)
			if (limitedExceeded) {
				setConsultationLimitExceeded(true);
				setActiveSettingsView('Account');
				router.push('/dashboard/settings');
			} else {
				setActiveView('Note')
			}
		}
	}
	//
	return (
		<div className='h-full overflow-y-auto'>
			<div className='flex flex-col gap-6'>
				{dummyResponse.map((res) => (
					<div key={res.time_stamp}>
						<span className='text-xs md:text-sm font-light text-slate-500'>{res.time_stamp}</span>
						<p className='text-xs md:text-sm font-light text-slate-600'>{res.text}</p>
					</div>
				))}
			</div>

			{/* Finish and generate note */}
			<div className='flex items-center gap-[1px] bottom-24 fixed right-8 ml-4'>
				{/* Pause recording  */}
				{showPause && (
					<div ref={pauseRef}>
						<button
							onClick={() => setShowPause(false)}
							type='button'
							className={cn(
								button_styles,
								'absolute text-sm right-0 font-light flex gap-2 items-center justify-center w-max px-6 -top-[110%] bg-[#36A477] h-[48px] rounded-md'
							)}
						>
							<PauseCircleIcon color='white' />{' '}
							<span className='text-white text-xs md:text-sm'>Pause Consultation</span>
						</button>
					</div>
				)}

				{/*  */}
				<button
					onClick={handleGenerateNotes}
					type='button'
					className={cn(
						button_styles,
						'bg-[#36A477] text-xs md:text-sm font-light text-white h-[48px] py-3 rounded-l-md flex items-center gap-2 px-8'
					)}
				>
					<svg width='17' height='12' viewBox='0 0 17 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M15.9423 1.06717L5.94229 11.0672C5.88425 11.1253 5.81531 11.1714 5.73944 11.2028C5.66357 11.2343 5.58224 11.2505 5.5001 11.2505C5.41797 11.2505 5.33664 11.2343 5.26077 11.2028C5.18489 11.1714 5.11596 11.1253 5.05792 11.0672L0.682916 6.69217C0.56564 6.57489 0.499756 6.41583 0.499756 6.24998C0.499756 6.08413 0.56564 5.92507 0.682916 5.80779C0.800191 5.69052 0.959251 5.62463 1.1251 5.62463C1.29096 5.62463 1.45002 5.69052 1.56729 5.80779L5.5001 9.74139L15.0579 0.182793C15.1752 0.0655181 15.3343 -0.000366212 15.5001 -0.000366211C15.666 -0.00036621 15.825 0.0655181 15.9423 0.182793C16.0596 0.300069 16.1255 0.459129 16.1255 0.624981C16.1255 0.790834 16.0596 0.949894 15.9423 1.06717Z'
							fill='white'
						/>
					</svg>
					<span>Finish and generate notes</span>
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
