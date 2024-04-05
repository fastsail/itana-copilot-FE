'use client';

import React from 'react';
import General from './_features/General';
import Note from './_features/Note';
import Account from './_features/Account';
import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';

export default function Settings() {
	const { settingsView } = useDashboardStateChange();

	const Views = {
		General: <General />,
		Note: <Note />,
		Account: <Account />,
	};

	return <div className='p-6'>{Views[settingsView]}</div>;
}
