import { screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';
import TitleHeader from '../_components/TitleHeader';
import { Card, CardContent } from '@/components/ui/card';

const pricing_data = [
	{
		background: 'white',
		title: 'Individual',
		amount: '14',
		tariff: 'per user, per month',
		buttonLabel: 'start my 15-day trial',
		buttonBackgroundColor: '#EEFAEB',
		buttonTextColor: '#5BC17F',
		offers: [
			'5 Social Profiles',
			'5 Scheduled Posts Per Profile',
			'400+ Templates',
			'Calendar View',
			'24/7 Support',
		],
	},
	{
		gradient: { from: '#F3FEE8', to: '#ECFEF7' },
		title: 'Best Value',
		amount: '29',
		tariff: 'per user, per month',
		buttonLabel: 'start my 15-day trial',
		buttonBackgroundColor: '#5BC17F',
		buttonTextColor: '#F3FEE8',
		offers: [
			'10 Social Profiles',
			'25 Scheduled Posts Per Profile',
			'400+ Templates',
			'Calendar View',
			'24/7 VIP Support',
		],
	},
	{
		background: 'white',
		title: 'Organisation',
		amount: '29',
		tariff: 'per user, per month',
		buttonLabel: 'start my 15-day trial',
		buttonBackgroundColor: '#EEFAEB',
		buttonTextColor: '#5BC17F',
		offers: [
			'100 Social Profiles',
			'100 Scheduled Posts Per Profile',
			'400+ Templates',
			'Calendar View',
			'24/7 VIP Support',
		],
	},
];

export default function Pricing() {
	return (
		<section className='bg-[#EEFFF5] py-12'>
			<div className={cn(screen_width_styles, 'flex flex-col items-center justify-center')}>
				<TitleHeader text='Pricing' />
				<h1 className='sm:text-4xl text-2xl font-semibold mt-6 text-center'>
					Subscribe to premium for best value
				</h1>

				<div className='w-full grid grid-cols-[repeat(auto-fit,_minmax(220px,1fr))] gap-12 mt-12 justify-center items-center'>
					{pricing_data.map((price) => (
						<Card
							key={price.amount}
							className={cn(
								'border-none mx-auto min-h-[600px] min-w-[200px] max-w-[350px] shadow-sm p-6 basis-1/3',
								price.gradient && 'bg-gradient-to-b from-[#F3FEE8] to-[#ECFEF7]'
							)}
						>
							<CardContent className='flex min-w-[200px] max-w-[350px] flex-col gap-6 items-center'>
								<h2 className='font-semibold text-xl'>{price.title}</h2>
								<span className='font-semibold text-5xl'>${price.amount}</span>
								<span className='text-black/40 text-sm'>{price.tariff}</span>

								<button
									style={{
										backgroundColor: price.buttonBackgroundColor,
										color: price.buttonTextColor,
									}}
									className={cn('px-8 py-3 capitalize text-sm')}
									type='button'
								>
									{price.buttonLabel}
								</button>

								<div className='h-[1px] w-[60%] bg-black/20' />

								{price.offers.map((offer) => (
									<span key={offer} className='text-sm text-center font-light text-black/70'>
										{offer}
									</span>
								))}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
