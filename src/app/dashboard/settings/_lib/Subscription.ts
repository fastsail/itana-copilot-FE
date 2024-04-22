import axios from 'axios';
import { Price } from '@/app/(Home)/type';

//-- Returns user current subscription --//
const getSubscriptionPlan = () => {
	return 'Free';
};

const getUpgradePrice = async (productId: string): Promise<number | null> => {
	try {
		// Get all products
		const { data } = await axios.get<Price[]>('/api/get_products');
		const products: Price[] = data;

		// Find the product with the matching productId
		const matchingProduct = products.find((product) => product.id === productId);

		// If no matching product is found, return null
		if (!matchingProduct) {
			return null;
		}

		// Calculate and return the price
		const price = matchingProduct.unit_amount / 100; // Convert from cents to dollars
		return price;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw new Error('Failed to fetch products');
	}
};

const handleSubscription = async (priceId: string) => {
	const { data } = await axios.post(
		'/api/payment',
		{
			priceId,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	window.location.assign(data);
};

export { getSubscriptionPlan, getUpgradePrice, handleSubscription };
