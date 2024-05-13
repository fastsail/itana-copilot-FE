import { create } from 'zustand';
import { EncounterData } from '../dashboard/current-consultation/_data/type';
import { createBasicEncounter } from '../(Home)/_utils/encounterUtils';

interface EncounterState {
  encounter: EncounterData | null;
  setEncounter: (user: EncounterData) => void;
  addTranscript: (transcript: string, timestamp: string) => void;
  setCompletedNoteGenerations: (data: any[]) => void;
  clearEncounter: () => void;
}

export const useEncounterStore = create<EncounterState>((set) => ({
  encounter: null,
  setEncounter: (encounter) =>
    set((state) => ({
      encounter: encounter ? encounter : createBasicEncounter(), // If encounter is null or undefined, initialize with createBasicEncounter()
    })),
  addTranscript: (transcript, timestamp) =>
    set((state) => ({
      encounter: {
        ...(state.encounter || createBasicEncounter()), // Initialize encounter if it's null
        transcript: {
          sessions: [
            ...(state.encounter?.transcript?.sessions || []), // Initialize sessions if it's null
            { transcript: transcript, timestamp: timestamp },
          ],
        },
      },
    })),
  setCompletedNoteGenerations: (data) =>
    set((state) => ({
      encounter: {
        ...(state.encounter || createBasicEncounter()), // Initialize encounter if it's null
        completedNoteGenerations: data,
      },
    })),
  clearEncounter: () => set({ encounter: null }),
}));