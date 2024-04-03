import React from 'react';
import { button_styles, screen_width_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import ItanaLogo from '@/assets/images/itana-logo-white.png';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const footer_data = {
	'About Itana': [
		{
			label: 'Company Overview',
			href: '/',
		},
		{
			label: 'Careers',
			href: '/',
		},
		{
			label: 'Press and Media',
			href: '/',
		},
		{
			label: 'Testimonials',
			href: '/',
		},
	],

	Resources: [
		{
			label: 'Blog',
			href: '/',
		},
		{
			label: 'Help Centers',
			href: '/',
		},
		{
			label: 'Webinars & Events',
			href: '/',
		},
		{
			label: 'Case Studies',
			href: '/',
		},
	],

	'Support & Contact': [
		{
			label: 'Contact Us',
			href: '/',
		},
		{
			label: 'Technical Support',
			href: '/',
		},
		{
			label: 'Feedback',
			href: '/',
		},
		{
			label: 'Community Forum',
			href: '/',
		},
	],

	Connect: [
		{
			label: 'Instagram',
			href: '/',
			logo: (
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M15.5376 8.0188C15.5376 3.86842 12.1692 0.5 8.0188 0.5C3.86842 0.5 0.5 3.86842 0.5 8.0188C0.5 11.6579 3.08647 14.688 6.51504 15.3872V10.2744H5.01128V8.0188H6.51504V6.1391C6.51504 4.68797 7.69549 3.50752 9.14662 3.50752H11.0263V5.76316H9.52256C9.10902 5.76316 8.77068 6.1015 8.77068 6.51504V8.0188H11.0263V10.2744H8.77068V15.5C12.5677 15.1241 15.5376 11.9211 15.5376 8.0188Z'
						fill='#F2F2F2'
					/>
				</svg>
			),
		},
		{
			label: 'Facebook',
			href: '/',
			logo: (
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M15.0784 3.08455C15.3013 3.6733 15.4177 4.29782 15.4268 4.92733C15.4732 5.71947 15.4734 5.97854 15.475 7.98365L15.4751 8.01165C15.4751 10.0432 15.4643 10.2968 15.4285 11.0968C15.416 11.7197 15.2988 12.3334 15.0801 12.9155C14.6901 13.92 13.8959 14.715 12.8905 15.105C12.3084 15.3237 11.6939 15.441 11.0727 15.4534C10.2786 15.5 10.0183 15.5 7.98766 15.5H7.98754C5.95682 15.5 5.70319 15.4892 4.90238 15.4534C4.27869 15.4335 3.66416 15.3054 3.08538 15.0792C2.07917 14.6901 1.28501 13.8951 0.895 12.8905C0.676295 12.3076 0.559042 11.6939 0.546568 11.0719C0.5 10.2769 0.5 10.0174 0.5 7.9867C0.5 5.95599 0.510811 5.70236 0.546568 4.90155C0.558211 4.28036 0.676295 3.66582 0.895 3.08455C1.28418 2.07917 2.07917 1.28418 3.08455 0.895C3.66582 0.676295 4.28036 0.559042 4.90155 0.545737C5.6957 0.5 5.95599 0.5 7.9867 0.5C10.0174 0.5 10.2711 0.509979 11.071 0.545737C11.693 0.559042 12.3076 0.676295 12.8889 0.895C13.8942 1.28418 14.6884 2.07917 15.0784 3.08455ZM4.13733 7.98255C4.13733 10.1064 5.85786 11.8269 7.98171 11.8269C10.1039 11.8269 11.8261 10.1064 11.8261 7.98255C11.8261 5.85869 10.1039 4.13816 7.98171 4.13816C5.85786 4.13816 4.13733 5.85869 4.13733 7.98255ZM11.0827 3.99596C11.0827 4.49158 11.4827 4.8924 11.9791 4.8924C12.4739 4.8924 12.8747 4.49158 12.8747 3.99596C12.8747 3.50034 12.4739 3.09951 11.9791 3.09951C11.4827 3.09951 11.0827 3.50034 11.0827 3.99596ZM10.4789 7.98251C10.4789 9.36169 9.36085 10.4797 7.98167 10.4797C6.60248 10.4797 5.48444 9.36169 5.48444 7.98251C5.48444 6.60332 6.60248 5.48528 7.98167 5.48528C9.36085 5.48528 10.4789 6.60332 10.4789 7.98251Z'
						fill='#F2F2F2'
					/>
				</svg>
			),
		},
		{
			label: 'Twitter',
			href: '/',
			logo: (
				<svg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M12.3131 0.25H14.6131L9.58813 5.96913L15.5 13.75H10.8713L7.24625 9.03032L3.0975 13.75H0.79625L6.17125 7.63259L0.5 0.250622H5.24625L8.52312 4.56455L12.3131 0.25ZM11.5063 12.3796H12.7806L4.55375 1.54878H3.18625L11.5063 12.3796Z'
						fill='#F2F2F2'
					/>
				</svg>
			),
		},
		{
			label: 'Linkedin',
			href: '/',
			logo: (
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M13 0.5C13.663 0.5 14.2989 0.763392 14.7678 1.23223C15.2366 1.70107 15.5 2.33696 15.5 3V13C15.5 13.663 15.2366 14.2989 14.7678 14.7678C14.2989 15.2366 13.663 15.5 13 15.5H3C2.33696 15.5 1.70107 15.2366 1.23223 14.7678C0.763392 14.2989 0.5 13.663 0.5 13V3C0.5 2.33696 0.763392 1.70107 1.23223 1.23223C1.70107 0.763392 2.33696 0.5 3 0.5H13ZM4.66667 6.33333C4.44565 6.33333 4.23369 6.42113 4.07741 6.57741C3.92113 6.73369 3.83333 6.94565 3.83333 7.16667V11.3333C3.83333 11.5543 3.92113 11.7663 4.07741 11.9226C4.23369 12.0789 4.44565 12.1667 4.66667 12.1667C4.88768 12.1667 5.09964 12.0789 5.25592 11.9226C5.4122 11.7663 5.5 11.5543 5.5 11.3333V7.16667C5.5 6.94565 5.4122 6.73369 5.25592 6.57741C5.09964 6.42113 4.88768 6.33333 4.66667 6.33333ZM7.16667 5.5C6.94565 5.5 6.73369 5.5878 6.57741 5.74408C6.42113 5.90036 6.33333 6.11232 6.33333 6.33333V11.3333C6.33333 11.5543 6.42113 11.7663 6.57741 11.9226C6.73369 12.0789 6.94565 12.1667 7.16667 12.1667C7.38768 12.1667 7.59964 12.0789 7.75592 11.9226C7.9122 11.7663 8 11.5543 8 11.3333V8.28333C8.32511 7.92969 8.7205 7.64784 9.16083 7.45583C9.43833 7.3375 9.85583 7.28917 10.1458 7.38083C10.242 7.40524 10.3277 7.46022 10.39 7.5375C10.4333 7.59583 10.5 7.72583 10.5 8V11.3333C10.5 11.5543 10.5878 11.7663 10.7441 11.9226C10.9004 12.0789 11.1123 12.1667 11.3333 12.1667C11.5543 12.1667 11.7663 12.0789 11.9226 11.9226C12.0789 11.7663 12.1667 11.5543 12.1667 11.3333V8C12.1667 7.44167 12.025 6.945 11.73 6.54667C11.4585 6.18546 11.0786 5.9206 10.6458 5.79083C9.89417 5.555 9.06167 5.68583 8.50583 5.92417C8.32774 6.00039 8.15437 6.08721 7.98667 6.18417C7.95173 5.99216 7.85052 5.8185 7.70066 5.69347C7.55081 5.56844 7.36183 5.49997 7.16667 5.5ZM4.66667 3.83333C4.44565 3.83333 4.23369 3.92113 4.07741 4.07741C3.92113 4.23369 3.83333 4.44565 3.83333 4.66667C3.83333 4.88768 3.92113 5.09964 4.07741 5.25592C4.23369 5.4122 4.44565 5.5 4.66667 5.5C4.88768 5.5 5.09964 5.4122 5.25592 5.25592C5.4122 5.09964 5.5 4.88768 5.5 4.66667C5.5 4.44565 5.4122 4.23369 5.25592 4.07741C5.09964 3.92113 4.88768 3.83333 4.66667 3.83333Z'
						fill='#F2F2F2'
					/>
				</svg>
			),
		},
	],
};

export default function Footer() {
	const headers = Object.keys(footer_data);

	return (
		<section className='w-screen py-12 bg-[#1E3337]'>
			<div className={cn(screen_width_styles)}>
				<div className='flex gap-6 items-center'>
					<Image src={ItanaLogo} alt='itana logo' /> <div className='h-[1px] w-full bg-white' />
				</div>

				{/*  */}
				<div className='flex gap-6 mt-16 flex-wrap lg:flex-nowrap'>
					{headers.map((header) => (
						<Card key={header} className='basis-1/4 bg-transparent border-none min-w-[200px]'>
							<CardContent>
								<h1 className='text-white font-medium text-base mb-4'>{header}</h1>
								<div className='flex flex-col gap-2'>
									{footer_data[header as keyof typeof footer_data].map((link: any) => (
										<Link
											className={cn(
												'text-sm font-light flex items-center gap-2',
												button_styles,
												'p-0 h-max py-1'
											)}
											href={link.href}
										>
											{link?.logo && link.logo}
											<span className='text-white'>{link.label}</span>
										</Link>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/*  */}

				<div className='h-[1px] w-full bg-white mt-16' />

				<div className='flex justify-between items-center mt-5 flex-wrap'>
					<span className='text-sm font-light text-white'>©2024 itana · All rights reserved.</span>
					<div className='flex items-center gap-6 min-w-[200px]'>
						{['Term of user', 'Privacy policy', 'Security'].map((link) => (
							<Link
								className={cn(
									'text-sm font-light flex items-center gap-2',
									button_styles,
									'p-0 h-max py-1 text-white'
								)}
								href={`/${link}`}
							>
								{link}
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
