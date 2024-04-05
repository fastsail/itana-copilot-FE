import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthImage from '@/assets/images/auth_Image_one.png';
import { cn } from '@/lib/utils';
import { button_styles } from '@/constants/global.const';
import { useSignupContext } from '../useSignupContext';

export default function Welcome() {
	//
	const { setActiveView, setProgress, incrementValue } = useSignupContext();
	//
	return (
		<>
			<div className='mt-[50px]'>
				<Image src={AuthImage} alt='authentication' />
			</div>

			<h1 className='text-xl font-semibold mb-3'>Welcome!</h1>
			<p className='text-sm font-light max-w-[400px] text-center'>
				Itana Copilot is the leading ambient AI assistant, reducing practitioner burn-out and improving patient
				care.
			</p>
			<button
				onClick={() => {
					setActiveView('Specialty');
					setProgress((progress) => progress + incrementValue);
				}}
				type='button'
				className={cn(
					button_styles,
					'h-[52px] w-full max-w-[359px] mt-6 px-12 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
				)}
			>
				Try it for free
			</button>

			<Link href='/docs' legacyBehavior passHref>
				<span className='font-light mt-6 h-[50px] px-12 text-sm'>
					Already have an account? <b className='text-[#36A477] font-semibold'>Sign In</b>
				</span>
			</Link>
		</>
	);
}
