import { Card, CardContent } from '@/components/ui/card';
import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';

const stats_data = [
	{
		amount: '115k+',
		label: 'Active Users',
	},
	{
		amount: '88k',
		label: 'Passive Users',
	},
	{
		amount: '30%',
		label: 'Increase Users',
	},
	{
		amount: '>10k',
		label: 'Good testimonials',
	},
];

export default function Stats() {
	return (
		<section className='w-screen py-12'>
			<div className={cn(screen_width_styles, 'flex flex-wrap sm:flex-row flex-col')}>
				{stats_data.map((item) => (
					<Card
						key={item.amount}
						className='border-l-0 border-t-0 sm:border-b-0 sm:border-r border-r-0 rounded-none shadow-none sm:basis-1/4'
					>
						<CardContent className='flex flex-col gap-5 p-6 items-center'>
							<span className='font-semibold text-4xl'>{item.amount}</span>
							<span className='text-black/60 font-light text-sm text-center'>{item.label}</span>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
