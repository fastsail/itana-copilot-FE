import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const userId = url.searchParams.get('id');

	if (!userId) {
		return NextResponse.json({ message: 'Missing user ID parameter' });
	}

	try {
		const response = await fetch(`https://getuser-sbmzuuqa7a-uc.a.run.app?id=${userId}`);
		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
