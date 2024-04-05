import Image from 'next/image';
import React from 'react';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import EmailImage from '@/assets/images/email.png';
import { InputField } from '@/app/components/InputField';
import { useSignupContext } from '../useSignupContext';

export default function Email() {
	//
	const { setActiveView, setProgress, incrementValue } = useSignupContext();
	//
	return (
		<>
			<h1 className='text-xl mt-[56px] font-medium mb-3'>Enter your email address</h1>

			<div className='mt-6 mb-16'>
				<Image src={EmailImage} alt='authentication' />
			</div>

			<form className='max-w-[400px] w-full'>
				<InputField name='email' label='Email' placeholder='testing@gmail.com' />
			</form>

			<button
				onClick={() => {
					setActiveView('Verification');
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
