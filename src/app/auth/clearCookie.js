import { clearCookie } from "../../auth";

export async function clearAppCookie() {
	'use server';
	await clearCookie();
}
