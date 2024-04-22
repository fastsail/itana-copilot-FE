import { NextRequest, NextResponse } from 'next/server';
import { User } from "@workos-inc/node";

export async function POST(request: NextRequest) {
	const body: User & { plan_id: string } = await request.json();

	try {
		// Assuming the body contains user data (replace with your actual data)
		const userData = {
			uid: body.id,
			email: body.email,
			name: body.firstName + ' ' + body.lastName,
			subscription_id: 'free',
			personal_info: '',
			plan_id: body.plan_id,
			planStarted: new Date().toISOString(),
		};

		// Send the POST request to create the user
		const response = await fetch('https://createauser-sbmzuuqa7a-uc.a.run.app', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			// Handle errors from the "createauser" API
			console.error('Error creating user:', await response.text());
			return NextResponse.json({ message: 'Failed to create user' });
		}

		const createdUser = await response.json();

		// You can now process the created user data or redirect the user
		// console.log('Created user:', createdUser);

		// Handle success scenario (e.g., redirect or return success message)
		return NextResponse.json(createdUser);
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Internal Server Error' });
	}
}
