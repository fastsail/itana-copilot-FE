import { SelectField } from '@/app/components/SelectField';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { detectAvailableMicrophones } from '../detectAvailableMic';
import { getDeviceName } from '../getDeviceName';
import { cn } from '@/lib/utils';
import { button_styles } from '@/constants/global.const';

type Microphone = {
	deviceId: string;
	label: string;
};
export default function General() {
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
	/**
    |--------------------------------------------------
    | Getting the device name
    |--------------------------------------------------
    */
	const [deviceName, setDeviceName] = React.useState('Loading...');

	React.useEffect(() => {
		const fetchDeviceName = async () => {
			const name = await getDeviceName();
			setDeviceName(name);
		};

		fetchDeviceName();
	}, []);
	//
	return (
		<div className='flex flex-col gap-8'>
			{/**
            |--------------------------------------------------
            | Language
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px]'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Language</span>
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
            | Encounter Language
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px]'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Encounter Language</span>
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
            | Show the language selector
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Show the language selector before each encounter</span>
					<span className='text-sm font-light text-slate-500'>Interface and note language</span>
				</div>

				<div className='flex items-center space-x-2'>
					<Switch id='airplane-mode' />
				</div>
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
					placeholder='Language'
				>
					{microphones?.map((item) => (
						<SelectItem key={item.deviceId} value={item.deviceId}>
							{item.label.trim()}
						</SelectItem>
					))}
				</SelectField>
			</div>

			{/**
            |--------------------------------------------------
            | This device name
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>This device’s name</span>
				</div>
				<div className='flex h-12 border rounded-md w-full max-w-[180px] px-4'>
					<span className='font-light text-sm flex items-center justify-center'>{deviceName}</span>
				</div>
			</div>

			{/**
            |--------------------------------------------------
            | Devices to which your notes will automatically be sent
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>
						Devices to which your notes will automatically be sent
					</span>
				</div>
				<div className='flex h-12 border rounded-md w-full max-w-[180px] px-4'>
					<span className='font-light text-sm flex items-center justify-center'>Not device yet</span>
				</div>
			</div>

			{/**
            |--------------------------------------------------
            | Receive notes
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>Receive notes from other devices</span>
				</div>
				<div className='w-max'>
					<button
						type='button'
						className={cn(
							button_styles,
							'h-[52px] w-full gap-4 rounded-md px-6 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
						)}
					>
						Receive notes from phone
					</button>
					<button
						type='button'
						className={cn(
							button_styles,
							'h-[52px] w-max gap-4 rounded-md mt-4 px-6 font-light text-black border border-slate-700 flex items-center justify-center text-sm'
						)}
					>
						Receive from another computer
					</button>
				</div>
			</div>

			{/**
            |--------------------------------------------------
            | Show the language selector
            |--------------------------------------------------
            */}
			<div className='flex justify-between items-center w-full max-w-[500px] border-b pb-6'>
				<div className='flex flex-col gap-1'>
					<span className='text-sm font-semibold'>
						Allow audio sharing after encounter to improve the transcription
					</span>
					<span className='text-sm font-light text-slate-500'>Interface and note language</span>
				</div>

				<div className='flex items-center space-x-2'>
					<Switch id='airplane-mode' />
				</div>
			</div>
		</div>
	);
}
