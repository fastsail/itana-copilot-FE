'use client'
import { isConsultationLimitExceeded } from '@/lib/dashboard';
import { handleUser } from '@/lib/handleUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useUserStore } from '../zustand/useUserState';
import { Spinner } from './_components';
import Sidebar from './_components/Sidebar';
import TopNavigation from './_components/TopNavbar';
import { useDashboardStateChange } from '../zustand/useDashboardStateChange';

const consulation_limit = 30; //--> Get from DB

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const {userObject, loading} = useAuth();
	const {setUser, user} = useUserStore();
	const {setActiveSettingsView, setConsultationLimitExceeded} = useDashboardStateChange();
	const [loadingUserFromDB, setLoadingUserFromDB] = useState<boolean>(true);
	const [consultations, setConsultations] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			console.log('User Object : ', userObject?.user);
			if (userObject?.user) {
				console.log("Load once");
				try {
					const userFromDB = await handleUser(userObject.user);
					setUser(userFromDB.data);

					const consultations = userFromDB.data.consultations;
					setConsultations(consultations);

					setLoadingUserFromDB(false);
				} catch (error) {
					console.error('Error fetching user from DB:', error);
				}
			}
		};
	
		fetchData();
	}, [userObject?.user, setUser]);
	
	if(loading || loadingUserFromDB){
		return<Spinner />
	};

	return (
		<main className='flex w-screen'>
			<Sidebar />
			<section className='w-full'>
				<TopNavigation />
				{children}
			</section>
		</main>
	);
}
