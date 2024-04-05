import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import React from 'react';

export default function ContactUs() {
	return (
		<div className='p-6'>
			<h1 className='text-sm font-semibold'>Your Message</h1>

			<div className='w-[80%]'>
				<textarea
					className='w-full text-sm placeholder:text-sm font-light min-h-[500px] border resize-none rounded-md mt-6 p-6'
					placeholder='Your enquiry here'
				/>
				<button
					type='button'
					className={cn(
						button_styles,
						'h-[52px] w-full gap-4 rounded-md mt-12 px-24 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
					)}
				>
					Send
				</button>
			</div>
		</div>
	);
}
