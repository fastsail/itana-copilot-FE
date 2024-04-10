import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import HeroImage from '@/assets/images/hero_image_one.png';
import Image from 'next/image';
import TitleHeader from '../_components/TitleHeader';

export default function Hero() {
	return (
		<section className='min-h-[598px] flex items-start py-24 w-full bg-gradient-to-b from-[#EEFCF9] to-[#F9FDF0]'>
			<div className={cn(screen_width_styles, 'flex items-start justify-between flex-col sm:flex-row')}>
				<div className='flex flex-col justify-center my-auto sm:items-start items-center'>
					<TitleHeader text='An AI Assistant' />

					<h1 className='font-semibold tracking-tight sm:text-6xl text-2xl mt-6'>Focus on the patient</h1>
					<p className='max-w-[600px] sm:text-left text-center sm:text-base text-sm font-light mt-6 leading-6'>
						Itana Copilot is the leading ambient AI assistant, reducing practitioner burn-out and improving
						patient care.
					</p>

					<Link href='/docs' legacyBehavior passHref>
						<span className='font-light max-w-[259px] mt-12 bg-[#36A477] h-[50px] px-12 text-white flex items-center justify-center text-sm'>
							Try it for free
						</span>
					</Link>
				</div>
				<div className='sm:mt-0 mt-8'>
					<Image height={500} width={600} src={HeroImage} alt='hero image of docs' />
				</div>
			</div>
		</section>
	);
}
