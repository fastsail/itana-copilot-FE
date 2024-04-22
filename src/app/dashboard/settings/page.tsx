'use client';
import React from 'react';
import General from './_features/General';
import Note from './_features/Note';
import Account from './_features/Account';
import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import useAuthenticated from './_hooks/useAuthenticated';
import { Spinner } from '../_components';
import { useAuth } from '@/app/auth/useAuth';
import { User } from "@workos-inc/node";
import { LimitExceeded } from './_components/LimitExceeded';

export default function Settings() {
	//
	const {data, loading} = useAuthenticated();
	const { settingsView, consultationLimitExceeded } = useDashboardStateChange();
	const { userObject, logout } = useAuth();
	let user: User | null = null;

	if (userObject && userObject.isAuthenticated) {
		user = userObject.user;
	}

	//
	const Views = {
		General: <General data={data?.data.general_settings || []} />,
		Note: <Note data={data?.data.notes_settings || []}/>,
		Account: <Account email={user?.email || ""} logout={logout} />,
	};

	if(loading){ 
		return <Spinner />
	};

	return (
		<div className='flex flex-col min-h-[80%]'>	
			{consultationLimitExceeded && <LimitExceeded /> }
			<div className='p-6 justify-between '>
				{Views[settingsView]}
				<p className='text-xs text-slate-400 font-thin mt-10'>Version {data?.data.version}</p>
			</div>
		</div>
	);
}
