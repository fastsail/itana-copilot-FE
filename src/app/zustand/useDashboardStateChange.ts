import { create } from 'zustand';

type TabViews = 'Transcript' | 'Note';
type SettingsTabView = 'General' | 'Note' | 'Account';

interface DashboardState {
	activeView: TabViews;
	settingsView: SettingsTabView;
	consultationViews: 'default' | 'transcript-view';
	showSidebar: boolean;
	consultationLimitExceeded: boolean;
	setActiveView: (view: TabViews) => void;
	setActiveSettingsView: (view: SettingsTabView) => void;
	setConsultationView: (view: 'default' | 'transcript-view') => void;
	setShowSidebar: (value: boolean) => void;
	setConsultationLimitExceeded: (value: boolean) => void;
}

export const useDashboardStateChange = create<DashboardState>()((set) => ({
	settingsView: 'General',
	activeView: 'Transcript',
	consultationViews: 'default',
	showSidebar: false,
	consultationLimitExceeded: false,
	setActiveView: (view) => set(() => ({ activeView: view })),
	setConsultationView: (view) => set(() => ({ consultationViews: view })),
	setActiveSettingsView: (view) => set(() => ({ settingsView: view })),
	setShowSidebar: (value) => set(() => ({ showSidebar: value })),
	setConsultationLimitExceeded: (value) => set(() => ({ consultationLimitExceeded: value })),
}));
