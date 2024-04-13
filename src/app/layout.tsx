import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { getUser } from './auth/auth';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
	title: 'Itana copilot',
	description: 'This is a copilot application',
};

export default async function  RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated, user } = await getUser();
	console.log("User is authenticated ? ", isAuthenticated);
	
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<main>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
