import { v4 as uuidv4 } from 'uuid'; // Using uuid library for unique ID generation

export const createBasicEncounter = () => {
    const id = uuidv4(); // Generate a unique ID
    const createdAt = Date.now().toString();
  
    return {
      uuid: id,
      audioFeedbackEncryptionKey: "",
      completedNoteGenerations: [],
      createdAt: createdAt,
      fhirContext: "",
      freeText: "",
      isImportedViaAirdrop: false,
      kind: "",
      transcriptQuotes: {},
      version: "",
      email: "",
      updatedAt: Date.now(),
      transcript: { sessions: [] },
      title: "",
      patientContext: 0,
      rating: "",
      pendingNoteGeneration: "",
      type: "",
};
}