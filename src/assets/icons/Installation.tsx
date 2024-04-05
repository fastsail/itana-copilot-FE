import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
	className?: string;
};
export default function Installation({ className }: Props) {
	return (
		<div className={cn(className)}>
			<svg width='110' height='109' viewBox='0 0 110 109' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<g filter='url(#filter0_d_40_1017)'>
					<circle cx='55' cy='39' r='20' fill='url(#paint0_linear_40_1017)' />
					<circle cx='55' cy='39' r='19' stroke='white' strokeWidth='2' />
				</g>
				<path d='M50.3583 42.5332H59.1776V46.3677H50.3583V42.5332Z' fill='white' />
				<path
					d='M59.4843 43.3385C59.4843 42.0774 58.9874 40.868 58.1029 39.9763C57.2184 39.0847 56.0188 38.5837 54.768 38.5837C53.5171 38.5837 52.3175 39.0847 51.433 39.9763C50.5485 40.868 50.0516 42.0774 50.0516 43.3385L54.768 43.3385H59.4843Z'
					fill='white'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M54.7871 44.5271C57.4872 44.5271 59.6761 42.3383 59.6761 39.6382C59.6761 36.9381 57.4872 34.7493 54.7871 34.7493C52.087 34.7493 49.8982 36.9381 49.8982 39.6382C49.8982 42.3383 52.087 44.5271 54.7871 44.5271ZM54.7871 48.3616C59.6049 48.3616 63.5105 44.456 63.5105 39.6382C63.5105 34.8204 59.6049 30.9148 54.7871 30.9148C49.9693 30.9148 46.0637 34.8204 46.0637 39.6382C46.0637 44.456 49.9693 48.3616 54.7871 48.3616Z'
					fill='white'
				/>
				<defs>
					<filter
						id='filter0_d_40_1017'
						x='0.808735'
						y='0.194808'
						width='108.383'
						height='108.383'
						filterUnits='userSpaceOnUse'
						colorInterpolationFilters='sRGB'
					>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='15.3861' />
						<feGaussianBlur stdDeviation='17.0956' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 0.439216 0 0 0 0 0.564706 0 0 0 0 0.690196 0 0 0 0.12 0'
						/>
						<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_40_1017' />
						<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_40_1017' result='shape' />
					</filter>
					<linearGradient
						id='paint0_linear_40_1017'
						x1='58.8824'
						y1='52.1765'
						x2='67.3889'
						y2='21.4259'
						gradientUnits='userSpaceOnUse'
					>
						<stop stopColor='#E5F9D1' />
						<stop offset='0.927091' stopColor='#E5F9D1' />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
}
