import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { button_styles } from '@/constants/global.const';
import { getSubscriptionPlan, getUpgradePrice, handleSubscription } from '../_lib/Subscription';
import { useUserStore } from '@/app/zustand/useUserState';
import { UserData } from '../../type';

/**
 |--------------------------------------------------
 |Subscription Component
 |--------------------------------------------------
 | --> Todo: Get user subscription plan
 | --> Todo: Get user subscription plan
 */

export const Subscription = () => {
    const {user} = useUserStore();
    const [price, setPrice] = useState<string>("");
    const [productId, setProductId] = useState<string>("");

    useEffect(() => {
        console.log('User : ', user);
        if (user) {
            const fetchPrice = async () => {
                try {
                    const User: UserData = user;
                    const price = await getUpgradePrice(User.plan_id);
                    setPrice(price !== null ? price.toString() : ''); // Convert to string
                    setProductId(User.plan_id);
                } catch (error) {
                    console.error('Error fetching price:', error);
                }
            };
    
            fetchPrice();
        }
    }, [user]);

    return (
        <div className='flex justify-between flex-wrap gap-4 items-start w-full max-w-[600px] border-b pb-6'>
            <div className='flex flex-col gap-1'>
                <span className='text-sm font-semibold'>Subscription</span>
            </div>
            <div className='w-max'>
                <div className={cn('h-[52px] w-full rounded-md font-light flex-col text-end flex text-sm')}>
                    <span className='font-medium'>{getSubscriptionPlan()} Plan</span>
                    <span className='text-slate-600 text-xs'>Limited to 30 encounters per month</span>
                </div>
                {price && (
                    <button
                        type='button'
                        onClick={() => handleSubscription(productId)}
                        className={cn(
                            button_styles,
                            'h-[42px] w-max gap-4 ml-auto rounded-md px-6 font-light text-white bg-black border border-slate-700 flex items-center justify-center text-sm'
                        )}
                    >
                        Upgrade to ${price} per month
                    </button>
                )}
            </div>
        </div>
    )
}
