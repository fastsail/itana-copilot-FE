'use client';

import { useDashboardStateChange } from '@/app/zustand/useDashboardStateChange';
import React from 'react';
import Transcript from './Transcript';
import Notes from './Notes';

export default function TranscriptView() {
	const { activeView } = useDashboardStateChange();

	const Views = {
		Transcript: <Transcript />,
		Note: <Notes />,
	};

	return <div className='p-6'>{Views[activeView]}</div>;
}
