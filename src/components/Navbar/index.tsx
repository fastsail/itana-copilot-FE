'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Logo from '@/assets/images/itana-logo-black.png';
import Image from 'next/image';
import { button_styles } from '@/constants/global.const';
import { CircleX, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
	//
	const [isHidden, setIsHidden] = React.useState<boolean>(true);
	const pathname = usePathname();
	const hideNavbar = pathname.includes('/auth') || pathname.includes('/dashboard');
	//
	return hideNavbar ? null : (
		<nav className='w-screen md:sticky top-0 bg-white z-50 relative md:bg-transparent'>
			<div className='max-w-[1440px] hidden md:flex bg-white justify-between items-center px-[4%] h-[80px] mx-auto w-full'>
				<Link className='font-light text-sm' href='/' legacyBehavior passHref>
					<Image src={Logo} alt='itana-logo' />
				</Link>
				{/*  */}
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className='font-light text-sm'>
								Getting started
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<p className='font-light text-sm'>Parties</p>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className='font-light text-sm'>Clinicians</NavigationMenuTrigger>
						</NavigationMenuItem>

						<NavigationMenuItem className='!ml-4'>
							<Link className='font-light text-sm' href='/docs' legacyBehavior passHref>
								<NavigationMenuLink className={(navigationMenuTriggerStyle(), 'font-light text-sm')}>
									Documentation
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						{/*  */}
					</NavigationMenuList>
				</NavigationMenu>
				{/*  */}
				<Link href='/auth/signup' legacyBehavior passHref>
					<span
						className={cn(
							button_styles,
							'font-light bg-[#36A477] h-[40px] px-12 text-white flex items-center justify-center text-sm'
						)}
					>
						Sign Up Now
					</span>
				</Link>
			</div>
			{/**
			|--------------------------------------------------
			| For mobile view
			|--------------------------------------------------
			*/}
			<div className='px-[4%] py-5 fixed md:hidden flex justify-between items-center w-screen bg-white'>
				<Link className='font-light text-sm' href='/docs' legacyBehavior passHref>
					<Image className='w-[70px]' src={Logo} alt='itana-logo' />
				</Link>

				{isHidden ? (
					<Menu className='md:hidden' onClick={() => setIsHidden(!isHidden)} />
				) : (
					<CircleX className='md:hidden' onClick={() => setIsHidden(!isHidden)} />
				)}

				<div
					className={cn(
						'fixed w-screen h-screen bg-white top-[55px] transition-all py-6 px-[4%] left-0 flex flex-col justify-start',
						isHidden ? '-translate-x-[110vw] md:translate-x-0' : '-translate-x-0'
					)}
				>
					<NavigationMenu className='!h-[300px]  max-h-[300px] flex items-start'>
						<NavigationMenuList className='grid gap-y-3'>
							<NavigationMenuItem>
								<NavigationMenuTrigger className='font-light ml-1 p-0 text-sm'>
									Getting started
								</NavigationMenuTrigger>
							</NavigationMenuItem>

							<NavigationMenuItem className='mb-1'>
								<NavigationMenuTrigger className='font-light m-0 p-0 text-sm'>
									Clinicians
								</NavigationMenuTrigger>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<Link className='font-light p-0 text-sm' href='/docs' legacyBehavior passHref>
									<NavigationMenuLink
										className={(navigationMenuTriggerStyle(), 'font-light !p-0 text-sm')}
									>
										Documentation
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							{/*  */}
						</NavigationMenuList>
					</NavigationMenu>
					<Link href='/auth/signup' legacyBehavior>
						<span
							className={cn(
								button_styles,
								'font-light bg-[#36A477] w-[200px] h-[40px] px-12 text-white flex items-center justify-center text-sm'
							)}
						>
							Sign Up Now
						</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';
