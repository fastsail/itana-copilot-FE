import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';
import TitleHeader from '../_components/TitleHeader';
import Link from 'next/link';
import InpersonImage from '@/assets/images/inperson.png';
import Image from 'next/image';
import { SignInButton } from '@/app/auth/_components/SignInButton';

export default function InpersonConsultation() {
	return (
		<section className='py-12 w-screen'>
			<div className={cn(screen_width_styles, 'flex flex-col sm:flex-row')}>
				<div className='flex flex-1 flex-col'>
					<TitleHeader text='Start Consultation' />
					<h1 className='font-medium sm:text-5xl text-3xl my-8 sm:leading-[52px] tracking-tight'>
						Inperson or virtual consultation
					</h1>

					<p className='text-black/60 sm:text-base text-sm font-light max-w-[600px]'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud{' '}
					</p>

					<div className='grid sm:grid-cols-2 grid-cols-1 mt-5'>
						<SignInButton title='Try it for free' />
					</div>
				</div>
				<div className='flex flex-1 flex-col sm:mt-0 mt-8'>
					<Image src={InpersonImage} alt='in person consultation' />
				</div>
			</div>
		</section>
	);
}
