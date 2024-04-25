import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';
import TitleHeader from '../_components/TitleHeader';
import ListWrapper from '../_components/ListWrapper';
import Link from 'next/link';
import Image from 'next/image';
import DocumentImageOne from '@/assets/images/document_one.png';
import DocumentImageTwo from '@/assets/images/document_two.png';
import Vector from '@/assets/images/vector.png';
import { SignInButton } from '@/app/auth/_components/SignInButton';

export default function Documents() {
	return (
		<section className='pt-24 w-screen bg-[#266783] flex relative'>
			<div className={cn(screen_width_styles, 'flex flex-col-reverse sm:flex-row')}>
				<div className='flex flex-1 flex-col'>
					<div className=''>
						<Image className='sm:-translate-y-12' src={DocumentImageOne} alt='documents' />
						<Image className='sm:-translate-y-24' src={DocumentImageTwo} alt='documents' />
					</div>
				</div>
				<div className='flex flex-1'>
					<div className='flex h-max'>
						<div>
							<TitleHeader text='Documents' />
							<h1 className='font-medium my-10 sm:leading-[52px] sm:text-5xl text-3xl text-white'>
								Generate clinical documents
							</h1>

							<ListWrapper spacing='mt-4' color='white' text='Clinical Notes' />
							<ListWrapper spacing='mt-4' color='white' text='Patient Instructions' />
							<ListWrapper spacing='mt-4' color='white' text='Referral Letter' />
							<ListWrapper spacing='mt-4' color='white' text='Export as PDF' />

							<div className='grid sm:grid-cols-2 grid-cols-1 mt-5'>
								<SignInButton title='Try it for free' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-auto absolute right-0 bottom-1/3'>
				<Image
					width={284}
					height={178}
					className='h-[158px] w-[258px] object-contain'
					src={Vector}
					alt='documents'
				/>
			</div>
		</section>
	);
}
