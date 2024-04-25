import { getProductId } from "./home";

export async function handleUser(user:any) {
	const userId = user.id;
	const plan_id = await getProductId();
	const response = await fetch(`/api/fetch_user?id=${userId}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch user with ID: ${userId}`);
	}

	const data = await response.json();

	if (data.data) {
		return data;
	}

	const body = {...user, plan_id}

	//-- User doesn't exist, create a new user --//
	const newUserResponse = await fetch('/api/create_user', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	if (!newUserResponse.ok) {
		throw new Error(`Failed to create new user with ID: ${userId}`);
	};

	const userData = await newUserResponse.json();

	return userData;
}
