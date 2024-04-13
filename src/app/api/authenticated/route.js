import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = await fetch('https://authenticated-sbmzuuqa7a-uc.a.run.app');
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
