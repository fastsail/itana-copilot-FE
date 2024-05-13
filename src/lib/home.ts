import { Price } from "@/app/(Home)/type";
import axios from "axios";

async function storeProductId(productId: string): Promise<void> {
	if (!productId) {
		throw new Error('Missing product ID to store');
	}

	//-- Store the product ID directly in local storage --//
	localStorage.setItem('pid', productId);
}

async function getProductId(): Promise<string | null> {
	// Check if localStorage is available (works in browser environment)
	if (typeof window !== 'undefined' && window.localStorage) {
		const productId = localStorage.getItem('pid');
		if (productId !== null) {
			return productId;
		}
	}

	try {
		// Fallback to fetching product data from the server
		const { data } = await axios.get<Price[]>('/api/get_products');
		const products: Price[] = data;
		return products.length > 0 ? products[0].id : null;
	} catch (error) {
		console.error('Error fetching products:', error);
		return null;
	}
}

export { storeProductId, getProductId };
