'use client';

import React from 'react';
import Logo from '@/assets/images/auth_logo.png';
import Image from 'next/image';
import Welcome from './_features/Welcome';
import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Privacy from './_features/Privacy';
import Email from './_features/Email';
import Verification from './_features/Verification';
import Specialty from './_features/Specialty';
import { SignupContext, View } from './useSignupContext';

const views = ['Welcome', 'Specialty', 'Privacy', 'Email', 'Verification'];
const completeFigure = 100;
const numberOfViews = views.length;
const incrementValue = 20;

/**
|--------------------------------------------------
| Types
|--------------------------------------------------
*/

export default function Signup() {
	const [activeView, setActiveView] = React.useState<View>('Welcome');
	const [progress, setProgress] = React.useState<number>(completeFigure / numberOfViews);
	/**
	|--------------------------------------------------
	| Views from the welcome view to the otp verification
	|--------------------------------------------------
	*/
	const Views = {
		Welcome: <Welcome />,
		Specialty: <Specialty />,
		Privacy: <Privacy />,
		Email: <Email />,
		Verification: <Verification />,
	};
	//
	return (
		<SignupContext.Provider value={{ setProgress, setActiveView, incrementValue }}>
			<section className='w-screen py-12 bg-gradient-to-b from-[#EEFCF9] to-[#F9FDF0] min-h-screen'>
				<div className='mx-auto w-full flex justify-center'>
					<Image src={Logo} alt='' />
				</div>

				<div className={cn(screen_width_styles, 'bg-white mt-[51px] flex flex-col items-center pb-20')}>
					<div className='flex gap-4 items-center w-full max-w-[400px] mt-16'>
						{views.map((view, index) => (
							<span
								key={view}
								className={cn(
									'flex w-1/4 h-1 bg-slate-200 transition-all duration-300',
									(completeFigure / numberOfViews) * (index + 1) <= progress && 'bg-[#36A477]'
								)}
							/>
						))}
					</div>

					{/* Views */}
					{Views[activeView]}
				</div>
			</section>
		</SignupContext.Provider>
	);
}
