//-- Remove hardcoded limit --//
export const isConsultationLimitExceeded = (consultations: number, limit: number = 30): boolean => {
	return consultations > limit;
};
