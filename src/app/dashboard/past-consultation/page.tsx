'use client';

import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import { Microphone, Notepad } from '@/assets/icons';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function PastConsultation() {
	//
	const router = useRouter();
	const { setConsultationView: setViewState } = useDashboardStateChange();
	//
	return (
		<div className='p-6 flex h-full flex-col items-center'>
			<div className='mt-[140px] flex flex-col items-center'>
				<Notepad />

				<h1 className='font-semibold mt-8'>No past consultation</h1>
				<button
					onClick={() => {
						router.push('/dashboard/current-consultation');
						setViewState('transcript-view');
					}}
					type='button'
					className={cn(
						button_styles,
						'h-[52px] w-full max-w-[360px] gap-4 rounded-md mt-12 px-12 md:px-24 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
					)}
				>
					<Microphone color='white' /> Start Consultation
				</button>
			</div>
		</div>
	);
}
