import React from 'react';

type Props = {
	text: string;
};
export default function TitleHeader({ text }: Props) {
	return (
		<div className='bg-gradient-to-r from-[#F5EEC6] to-[#A2DCC4] items-center justify-center p-[2px] rounded-[50px] w-full max-w-[259px] h-10'>
			<div className='flex items-center bg-white rounded-[50px] gap-4 h-full justify-center'>
				<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g clipPath='url(#clip0_20_1695)'>
						<path
							d='M12.6666 0.666626L11.8266 2.49996L9.99996 3.33329L11.8266 4.17329L12.6666 5.99996L13.5 4.17329L15.3333 3.33329L13.5 2.49996M5.99996 2.66663L4.33329 6.33329L0.666626 7.99996L4.33329 9.66663L5.99996 13.3333L7.66663 9.66663L11.3333 7.99996L7.66663 6.33329M12.6666 9.99996L11.8266 11.8266L9.99996 12.6666L11.8266 13.5L12.6666 15.3333L13.5 13.5L15.3333 12.6666L13.5 11.8266'
							fill='#FDBA09'
						/>
					</g>
					<defs>
						<clipPath id='clip0_20_1695'>
							<rect width='16' height='16' fill='white' />
						</clipPath>
					</defs>
				</svg>

				<span className='text-sm font-light'>{text}</span>
			</div>
		</div>
	);
}
