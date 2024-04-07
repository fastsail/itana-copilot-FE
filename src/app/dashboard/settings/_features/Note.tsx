'use client';

import { SelectField } from '@/app/components/SelectField';
import { SelectItem } from '@/components/ui/select';
import React from 'react';
import { detectAvailableMicrophones } from '../detectAvailableMic';

type Microphone = {
	deviceId: string;
	label: string;
};
export default function Note() {
	/**
    |--------------------------------------------------
    | Getting available microphones
    |--------------------------------------------------
    */
	const [microphones, setMicrophones] = React.useState<Microphone[]>([]);

	React.useEffect(() => {
		const fetchMicrophones = async () => {
			const availableMicrophones = await detectAvailableMicrophones();
			setMicrophones(availableMicrophones);
		};

		fetchMicrophones();
	}, []);
	return (
		<div className='flex flex-col gap-8'>
			{/**
            |--------------------------------------------------
            | Note Template
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-24'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Note Template</span>
					<span className='text-sm font-light text-slate-500'>Interface and note language</span>
				</div>
				<SelectField className='h-12 border border-black/20' placeholder='Language'>
					{['English', 'Spanish', 'French'].map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
				</SelectField>
			</div>

			{/**
            |--------------------------------------------------
            | Punctuation while dictating
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Punctuation while dictating</span>
					<span className='text-sm font-light text-slate-500'>Interface and note language</span>
				</div>
				<SelectField className='h-12 border border-black/20' placeholder='Language'>
					{['English', 'Spanish', 'French'].map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
				</SelectField>
			</div>

			{/**
            |--------------------------------------------------
            | Microphone
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Microphone</span>
					<span className='text-sm font-light text-slate-500'>Interface and note language</span>
				</div>
				<SelectField
					className='h-12 flex justify-between text-start border border-black/20'
					placeholder={microphones?.[0]?.label}
				>
					{microphones?.map((item, index) => (
						<SelectItem key={item.deviceId} value={item.deviceId || `Unknown${index}`}>
							{item.label.trim()}
						</SelectItem>
					))}
				</SelectField>
			</div>
		</div>
	);
}
