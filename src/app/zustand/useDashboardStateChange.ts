import { create } from 'zustand';

type TabViews = 'Transcript' | 'Note';

interface DashboardState {
	consultationViews: 'default' | 'transcript-view';
	activeView: TabViews;
	setConsultationView: (view: 'default' | 'transcript-view') => void;
	setActiveView: (view: TabViews) => void;
}

export const useDashboardStateChange = create<DashboardState>()((set) => ({
	activeView: 'Transcript',
	consultationViews: 'default',
	setActiveView: (view) => set(() => ({ activeView: view })),
	setConsultationView: (view) => set(() => ({ consultationViews: view })),
}));
