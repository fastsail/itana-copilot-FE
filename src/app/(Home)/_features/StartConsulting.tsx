import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';
import TitleHeader from '../_components/TitleHeader';
import Link from 'next/link';
import ConsultingImage from '@/assets/images/start_consultation.png';
import Image from 'next/image';
import ListWrapper from '../_components/ListWrapper';
import { SignInButton } from '@/app/auth/_components/SignInButton';

export default function StartConsulting() {
	return (
		<section className='py-24 w-screen'>
			<div className={cn(screen_width_styles, 'flex items-start justify-between flex-col sm:flex-row')}>
				<div className='flex flex-col justify-center flex-[0.7]'>
					<TitleHeader text='Start Consultation' />
					<h1 className='font-medium tracking-tight sm:text-5xl text-2xl sm:leading-[52px] max-w-[400px] mt-5'>
						Focus on the patient
					</h1>

					<ListWrapper text='AI-Driven Forecasts' />

					<span className='block mt-4 text-black/60 sm:text-base text-sm font-light'>
						Harness the unmatched power of artificial intelligence with Nimbus...
					</span>

					<div className='grid sm:grid-cols-2 grid-cols-1 mt-5'>
					<SignInButton title='Try it for free'/>
					</div>
				</div>
				<div className='flex h-full flex-1 justify-end sm:mt-0 mt-8'>
					<Image width={640} height={500} src={ConsultingImage} alt='consultation illustration' />
				</div>
			</div>
		</section>
	);
}
