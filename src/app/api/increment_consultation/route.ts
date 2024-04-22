import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const userId = url.searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ message: 'Missing user ID parameter' });
	}
	try {
		const response = await fetch(`https://incrementconsultation-sbmzuuqa7a-uc.a.run.app?userId=${userId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
