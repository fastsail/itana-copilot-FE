'use client';

import React from 'react';
import Mic from './_components/Mic';
import { SelectField } from '@/app/components/SelectField';
import { SelectItem } from '@/components/ui/select';
import useMicrophoneComponent from './_components/MicrophoneComponent';
import { visualizerConfiguration } from './_data/data';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import { Microphone } from '@/assets/icons';
import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import TranscriptView from './_features/TranscriptView';

export default function CurrentConsultation() {
	//
	const { setupMicrophone, canvas, stopMicrophone, audioData } = useMicrophoneComponent();
	const viewState = useDashboardStateChange((state) => state.consultationViews);
	const setViewState = useDashboardStateChange().setConsultationView;
	//
	//
	return viewState === 'transcript-view' ? (
		<TranscriptView />
	) : viewState === 'default' ? (
		<div className='flex flex-col items-center mt-12 px-4'>
			<Mic />
			<h1 className='font-semibold text-xl tracking-tight'>Click to start consultation</h1>
			<p className='text-sm font-light text-center mt-3'>
				Click on start consultation below to start the <br />
				transcription.
			</p>

			<div className='min-h-[180px] rounded-xl border mt-8 p-5'>
				<div className='flex flex-wrap items-center gap-4'>
					<span className='text-sm font-light'>Consultation type</span>
					<SelectField placeholder='Consultation type' className='h-[47px]'>
						{['In person', 'Phone call'].map((item) => (
							<SelectItem key={item} value={item}>
								{item}
							</SelectItem>
						))}
					</SelectField>
				</div>

				<div className='mt-8 flex h-[52] gap-4 items-start flex-wrap justify-between'>
					<div className='flex-col flex gap-2'>
						<span className='text-sm font-light'>Test your microphone</span>
						<button
							className='text-sm text-start font-semibold text-[#36A477]'
							type='button'
							onClick={audioData === null ? setupMicrophone : stopMicrophone}
						>
							{audioData === null ? 'Test' : 'Stop'}
						</button>
					</div>
					<div className='flex items-center gap-1'>
						{visualizerConfiguration(audioData as Uint8Array)?.map((item, index) => (
							<span
								key={index}
								style={{ height: `${item.height}px` }}
								className='flex items-end w-[4px] bg-slate-200 rounded-md overflow-hidden'
							>
								<span style={{ height: `${item.percentage}%` }} className='w-full bg-[#36A477]' />
							</span>
						))}

						<div className='hidden'>{canvas}</div>
					</div>
				</div>
			</div>
			<button
				onClick={() => setViewState('transcript-view')}
				type='button'
				className={cn(
					button_styles,
					'h-[52px] w-full max-w-[360px] gap-4 rounded-md mt-12 px-12 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
				)}
			>
				<Microphone color='white' /> Start Consultation
			</button>
		</div>
	) : null;
}
