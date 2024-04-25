'use client'
import { useAuth } from '@/app/auth/useAuth';
import { useSubscriptionStore } from '@/app/zustand/useSubscriptionStore';
import { Card, CardContent } from '@/components/ui/card';
import { screen_width_styles } from '@/constants/global.const';
import { getProductId, storeProductId } from '@/lib/home';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TitleHeader from '../_components/TitleHeader';
import { getOfferDescriptionsById, getProductTitle } from '../_utils/Pricing';
import { Price } from '../type';
 
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
		amount: '129',
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
	const router = useRouter();
	const {authUrl, loading } = useAuth();
	const { setProduct } = useSubscriptionStore();
	const [prices, setPrices] = useState<Price[]>([]);

	useEffect(() => {
		fetchPrices();
	}, []);

	const fetchPrices = async () => {
		const {data} = await axios.get('/api/get_products');
		setPrices(data);
		console.log('data : ', data);
	};

	const colorSchemes = [
		{ buttonBackgroundColor: '#EEFAEB', buttonTextColor: '#5BC17F' },
		{ buttonBackgroundColor: '#5BC17F', buttonTextColor: '#EEFAEB' }
	];

	const handleSubscription = async (priceId: string) => {

		const {data} = await axios.post('/api/payment', {
			priceId
		}, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		window.location.assign(data);
	};

	const handleStart = async (id: string) => {
		await storeProductId(id);
		router.push(authUrl || "");
	};

	return (
		<section className='bg-[#EEFFF5] py-12'>
			<div className={cn(screen_width_styles, 'flex flex-col items-center justify-center')}>
				<TitleHeader text='Pricing' />
				<h1 className='sm:text-4xl text-2xl font-semibold mt-6 text-center'>
					Subscribe to premium for best value
				</h1>

				<div className='w-full grid grid-cols-[repeat(auto-fit,_minmax(220px,1fr))] gap-12 mt-12 justify-center items-center'>
					{prices.map((price, index) => (
						<Card
							key={price.id}
							className={cn(
								'border-none mx-auto min-h-[600px] min-w-[200px] max-w-[350px] shadow-sm p-6 basis-1/3',
								!((index+1) % 2) ? 'bg-gradient-to-b from-[#F3FEE8] to-[#ECFEF7]': 'bg-white'
							)}
						>
							<CardContent className='flex min-w-[200px] max-w-[350px] flex-col gap-6 items-center'>
								<h2 className='font-semibold text-xl'>{getProductTitle(price.lookup_key)}</h2>
								<span className='font-semibold text-5xl'>{(price.unit_amount/100).toLocaleString('en-US', {
									style: 'currency',
									currency: (price.currency).toUpperCase()
								})}</span>
								{/* <span className='text-black/40 text-sm'>{price.tariff}</span> */}

								{/* <button
									style={{
										backgroundColor: price.buttonBackgroundColor,
										color: price.buttonTextColor,
									}}
									className={cn('px-8 py-3 capitalize text-sm')}
									type='button'
								>
									{price.buttonLabel}
								</button> */}

								<button
									style={{
										backgroundColor: colorSchemes[index % colorSchemes.length].buttonBackgroundColor,
										color: colorSchemes[index % colorSchemes.length].buttonTextColor,
									  }}
									className={cn('px-8 py-3 capitalize text-sm')}
									type='button'
									onClick={() => handleStart(price.id)}
								>
									start my 15-day trial
								</button>

								<div className='h-[1px] w-[60%] bg-black/20' />

								{getOfferDescriptionsById(price.lookup_key).map((offer) => (
									<span key={offer} className='text-sm text-center font-light text-black/70'>
										{offer}
									</span>
								))}

								{/* {price.offers.map((offer) => (
									<span key={offer} className='text-sm text-center font-light text-black/70'>
										{offer}
									</span>
								))} */}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
