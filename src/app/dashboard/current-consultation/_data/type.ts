export interface EncounterData {
	uuid: string;
	audioFeedbackEncryptionKey: string;
	completedNoteGenerations: any[];
    createdAt: string;
	fhirContext: string;
	freeText: string;
	isImportedViaAirdrop: boolean;
	kind: string;
	transcriptQuotes: object;
	version: string;
	email: string;
	updatedAt: number;
	transcript: {sessions: any};
	title: string;
	patientContext: number;
	rating: string;
	pendingNoteGeneration: string;
	type: string;
}