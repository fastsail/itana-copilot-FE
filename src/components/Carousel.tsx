import * as React from 'react';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Props = {
	children: React.ReactNode;
};

export function CarouselWrapper({ children }: Props) {
	return (
		<Carousel
			opts={{
				align: 'start',
			}}
			className='w-full h-full relative'
		>
			<CarouselContent className='px-8 h-max'>{children}</CarouselContent>
			<CarouselPrevious className='sm:flex absolute bg-transparent left-0' />
			<CarouselNext className='sm:flex bg-transparent absolute right-0' />
		</Carousel>
	);
}
