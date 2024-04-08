import type { Metadata } from 'next';
import Sidebar from './_components/Sidebar';
import TopNavigation from './_components/TopNavbar';

export const metadata: Metadata = {
	title: 'Itana copilot dashboard',
	description: 'This is a copilot application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
