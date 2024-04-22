export interface Price {
	id: string;
	object: string;
	active: boolean;
	billing_scheme: string;
	created: number;
	currency: string;
	custom_unit_amount: number | null;
	livemode: boolean;
	lookup_key: string;
	metadata: Record<string, any>;
	nickname: string | null;
	product: string;
	recurring: {
		aggregate_usage: string | null;
		interval: string;
		interval_count: number;
		trial_period_days: number | null;
		usage_type: string;
	};
	tax_behavior: string;
	tiers_mode: string | null;
	transform_quantity: string | null;
	type: string;
	unit_amount: number;
	unit_amount_decimal: string;
}
