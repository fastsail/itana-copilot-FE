import * as React from 'react';

import Link from "next/link";
import Image from 'next/image';
import { cn } from '@/lib/utils';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { CircleX, Menu } from 'lucide-react';
import Logo from '@/assets/images/itana-logo-black.png';
import { button_styles } from '@/constants/global.const';

export function MobileView() {
    const [isHidden, setIsHidden] = React.useState<boolean>(true);
    return (
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
    )
}