import { create } from 'zustand';

type TabViews = 'Transcript' | 'Note';
type SettingsTabView = 'General' | 'Note' | 'Account';

interface DashboardState {
	activeView: TabViews;
	settingsView: SettingsTabView;
	consultationViews: 'default' | 'transcript-view';
	setActiveView: (view: TabViews) => void;
	setActiveSettingsView: (view: SettingsTabView) => void;
	setConsultationView: (view: 'default' | 'transcript-view') => void;
}

export const useDashboardStateChange = create<DashboardState>()((set) => ({
	settingsView: 'General',
	activeView: 'Transcript',
	consultationViews: 'default',
	setActiveView: (view) => set(() => ({ activeView: view })),
	setConsultationView: (view) => set(() => ({ consultationViews: view })),
	setActiveSettingsView: (view) => set(() => ({ settingsView: view })),
}));
