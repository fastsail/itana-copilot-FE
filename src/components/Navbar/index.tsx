"use client"
import Link from 'next/link';
import * as React from 'react';

import Logo from '@/assets/images/itana-logo-black.png';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MobileView } from './MobileView';
import { SignInButton } from '@/app/auth/_components/SignInButton';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/auth/useAuth';

export function Navbar() {
	const pathname = usePathname(); // Get current pathname
	const isDashboardRoute = pathname.startsWith('/dashboard/');
	const {loading} = useAuth();

	if(loading) return<nav className='max-w-[1440px] hidden md:flex bg-white justify-between items-center px-[4%] h-[80px] mx-auto w-full'>

	</nav>;
	//
	if(!isDashboardRoute){
		return (
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
						</NavigationMenuList>
					</NavigationMenu>
					{/*  */}
					<SignInButton />
				</div>
				{/**
			   |--------------------------------------------------
			   | For mobile view
			   |--------------------------------------------------
			   */}
				<MobileView />
			</nav>
		);
	}
	
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
