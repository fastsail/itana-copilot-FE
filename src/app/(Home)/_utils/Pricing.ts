interface Titles {
	[key: string]: string;
}

interface OfferDescriptions {
	[key: string]: string[];
}

const product_titles: Titles = {
	individual_monthly: 'Individual',
	best_monthly: 'Best Value',
	organization_monthly: 'Organization',
};

const product_offers: OfferDescriptions = {
	individual_monthly: ['Offer 1 description...', 'Offer 2 description...'],
	best_monthly: ['Offer 3 description..', 'Offer 4 description..', 'Offer 5 description..',  ],
	organization_monthly: ['Offer 6 description..', 'Offer 7 description..', 'Offer 8 description..', 'Offer 9 description..'],
};

export function getProductTitle(id: string, titles: Titles = product_titles): string {
	return titles[id] || '';
}

export function getOfferDescriptionsById(identifier: string, offers: OfferDescriptions = product_offers): string[] {
	return offers[identifier] || [];
}
