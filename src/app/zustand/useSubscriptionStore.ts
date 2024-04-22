import { create } from 'zustand';

interface SubscriptionState {
	productId: string | null; // Or change to a subscription plan ID type if needed
	setProduct: (id: string) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()((set) => ({
	productId: null,
	setProduct: (id) => set({ productId: id }),
}));
