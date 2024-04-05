import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import PrivacyImage from '@/assets/images/privacy.png';
import { useSignupContext } from '../useSignupContext';

export default function Privacy() {
	//
	const { setActiveView, setProgress, incrementValue } = useSignupContext();
	//
	return (
		<>
			<h1 className='text-xl mt-[50px] font-semibold mb-3'>Data & Privacy</h1>

			<div className='mt-6'>
				<Image src={PrivacyImage} alt='authentication' />
			</div>

			<p className='text-sm font-light mt-8 max-w-[400px] text-center'>
				Itana Copilot is the leading ambient AI assistant, reducing practitioner burn-out and improving patient
				care.
			</p>
			<button
				onClick={() => {
					setActiveView('Email');
					setProgress((progress) => progress + incrementValue);
				}}
				type='button'
				className={cn(
					button_styles,
					'h-[52px] w-full max-w-[359px] mt-6 px-12 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
				)}
			>
				Next
			</button>
		</>
	);
}
