import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';
import TitleHeader from '../_components/TitleHeader';
import User from '@/assets/images/user.png';
import { CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselWrapper } from '@/components/Carousel';
import Image from 'next/image';

export default function Testimonials() {
	return (
		<section className='w-screen py-12 bg-[#F2F6FA]'>
			<div className={cn(screen_width_styles, 'flex flex-col items-center')}>
				<TitleHeader text='Testimonials' />
				<h1 className='sm:text-5xl text-2xl text-center my-5 font-medium leading-[52px] tracking-tight'>
					What our customers say
				</h1>

				<div className='sm:my-6' />
				<CarouselWrapper>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index} className='lg:basis-1/3 md:basis-1/2 border-[#A4DCC5] h-full'>
							<div className='p-1'>
								<Card className=' border-[#A4DCC5] h-max'>
									<CardContent className='flex justify-between h-max w-full gap-y-8 flex-col aspect-square items-center p-6'>
										<p className='sm:text-sm text-xs font-light leading-6 text-center'>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod
											perspiciatis, labore aperiam optio porro nulla at doloremque rem non
											consequuntur sunt quisquam laboriosam sint aliquam atque? Ipsam, esse
											obcaecati?
										</p>

										<div className='flex flex-col gap-3 items-center'>
											<Image
												className='rounded-full size-8 object-cover'
												src={User}
												alt='user image'
											/>
											<span className='text-sm tracking-tight font-semibold'>Bakare Spencer</span>
											<span className='text-sm font-light'>Physician</span>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselWrapper>
			</div>
		</section>
	);
}
