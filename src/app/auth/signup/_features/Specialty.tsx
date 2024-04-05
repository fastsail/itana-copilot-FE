import Image from 'next/image';
import React from 'react';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import EmailImage from '@/assets/images/email.png';
import { SelectField } from '@/app/components/SelectField';
import { SelectItem } from '@/components/ui/select';
import { useSignupContext } from '../useSignupContext';

export default function Specialty() {
	//
	const { setActiveView, setProgress, incrementValue } = useSignupContext();
	//
	return (
		<>
			<h1 className='text-xl mt-[56px] font-medium mb-3 text-center'>
				What is your <br /> medical speciality
			</h1>

			<div className='mt-6 mb-16'>
				<Image src={EmailImage} alt='authentication' />
			</div>

			<form className='max-w-[400px] flex flex-col gap-6 w-full'>
				<SelectField label='Medical Specialty' className='w-full h-[52px]' placeholder='Medical Speciality'>
					{['Surgeon', 'Pediatrician', 'Frontend', 'Backend'].map((item) => (
						<SelectItem key={item} className='text-slate-600' value={item}>
							{item}
						</SelectItem>
					))}
				</SelectField>

				<SelectField label='Country Of Practice' className='w-full h-[52px]' placeholder='Country Of Practice'>
					{['Surgeon', 'Pediatrician', 'Frontend', 'Backend'].map((item) => (
						<SelectItem key={item} className='text-slate-600' value={item}>
							{item}
						</SelectItem>
					))}
				</SelectField>
			</form>

			<button
				onClick={() => {
					setActiveView('Privacy');
					setProgress((progress) => progress + incrementValue);
				}}
				type='button'
				className={cn(
					button_styles,
					'h-[52px] w-full max-w-[400px] rounded-md mt-6 px-12 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
				)}
			>
				Next
			</button>
		</>
	);
}
