export interface SettingOption {
	label: string;
	value: string;
	description?: string;
}

export interface SettingDataProps {
	id: string;
	component: 'Selector' | 'Toggle' | 'Default';
	props: {
		label: string;
		description: string;
		defaultValue: string | boolean;
		options?: SettingOption[];
	};
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        notes_settings: SettingDataProps[];
        general_settings: SettingDataProps[];
        version: string;
    };
}