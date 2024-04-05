import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { button_styles } from '@/constants/global.const';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import EmailImage from '@/assets/images/email.png';
import { useRouter } from 'next/navigation';

export default function Verification() {
	//
	const router = useRouter();
	//
	return (
		<>
			<h1 className='text-xl mt-[56px] font-medium mb-3'>Enter verification code sent to email address</h1>

			<div className='mt-6 mb-16'>
				<Image src={EmailImage} alt='authentication' />
			</div>

			<InputOTP maxLength={4}>
				<InputOTPGroup className='gap-4'>
					<InputOTPSlot className='size-16' index={0} />
					<InputOTPSlot className='size-16 border-l' index={1} />
					<InputOTPSlot className='size-16 border-l' index={2} />
					<InputOTPSlot className='size-16 border-l' index={3} />
				</InputOTPGroup>
			</InputOTP>

			<button
				onClick={() => router.push('/dashboard/current-consultation')}
				type='button'
				className={cn(
					button_styles,
					'h-[52px] w-full max-w-[400px] rounded-md mt-10 px-12 font-light bg-[#36A477] text-white flex items-center justify-center text-sm'
				)}
			>
				Next
			</button>
		</>
	);
}
