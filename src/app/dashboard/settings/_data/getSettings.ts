interface SettingOption {
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

export const generalSettings: SettingDataProps[] = [
    {
        id: 'EncounterLanguage',
        component: 'Selector',
        props: {
            defaultValue: 'en',
            label: 'Encounter Language',
            description: 'The language you speak with your patient',
            options: [
                { label: 'English (US)', value: 'en_us' },
                { label: 'English (UK)', value: 'en_uk' },
                { label: 'French', value: 'fr' },
                { label: 'German', value: 'de' },
                { label: 'Chinese', value: 'zh' }
            ]
        }
    },
    {
        id: 'LanguageSelector',
        component: 'Selector',
        props: {
            label: 'Language',
            description: 'Interface and note language',
            defaultValue: 'en_us',
            options: [
                { label: 'English (US)', value: 'en_us' },
                { label: 'English (UK)', value: 'en_uk' },
                { label: 'French', value: 'fr' }
            ]
        }
    },
    {
        id: 'ShowLanguageSelector',
        component: 'Toggle',
        props: {
            defaultValue: false,
            label: 'Show Language Selector Before Each Encounter',
            description: 'Interface and note language'
        }
    },
    {
        id: 'PunctuationSelector',
        component: 'Selector',
        props: {
            defaultValue: 'auto',
            label: 'Punctuation when dictating',
            description: 'You can dictate punctuation explicitly or let Copilot detect it automatically',
            options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Explicit', value: 'explicit' }
            ]
        }
    },
	{
        id: 'Microphone',
        component: 'Selector',
        props: {
			defaultValue: '',
            label: 'Microphone',
            description: 'Select microphone',
            options: []
        }
    },
    {
        id: 'AudioSharing',
        component: 'Toggle',
        props: {
            defaultValue: false,
            label: 'Allow Audio Sharing After an Encounter to Improve Transcription',
            description: 'Useful if you often switch languages'
        }
    },
	{
        id: 'DeviceName',
        component: 'Default',
        props: {
            label: "This device’s name",
            defaultValue: 'Loading...',
            description: '',
			options: []
        }
    },
];

export const notesSettings: SettingDataProps[] = [
    {
        id: 'availableNoteTemplateGroups',
        component: 'Selector',
        props: {
            defaultValue: "",
            label: 'Note template',
            description: '',
            options: [
                { label: 'Detailed sections', value: 'GENERAL_MEDICINE', description: 'Multiple sections like chief complaint, HPI, past medical history, social history, allergies, physical exam, prescriptions...' },
                { label: 'Detailed sections ("Assessment" and "Plan" merged)', value: 'GENERAL_MEDICINE_KAISER', description: 'Multiple sections like chief complaint, HPI, past medical history, social history, allergies, physical exam, prescriptions, with the assessment and plan sections merged.' },
                { label: 'SOAP', value: 'SOAP', description: 'Follows the SOAP format.' },
                { label: 'SOAP ("Assessment" and "Plan" merged)', value: 'SOAP_KAISER', description: 'Follows the SOAP format, with the Assessment and Plan sections merged.' },
                { label: 'SOAP ("Assessment" and "Plan" merged, PE and Tests)', value: 'SOAP_PLUS_KAISER', description: 'SOAP merged with 2 additional sections: Physical Exam and Diagnostic Tests Ordered.' },
                { label: 'APSO', value: 'APSO_KAISER', description: 'SOAP with the Assessment & Plan section first.' },
                { label: 'Psychiatry (SOAP)', value: 'SOAP_PSY', description: 'Recommended for psychiatrists. Follows the SOAP format.' },
                { label: 'Psychiatry (multiple sections)', value: 'PSYCHIATRY', description: 'Recommended for psychiatrists. Detailed sections like chief complaint, HPI, past medical history, social history, allergies, mental status exam...' },
                { label: 'Cardiology', value: 'CARDIOLOGY', description: 'Recommended for cardiologists.' },
                { label: 'Diet', value: 'DIET', description: 'Recommended for dietitians and nutritionists.' },
                { label: 'Psychology', value: 'PSYCHOLOGY', description: 'Recommended for psychologists and mental health specialists.' },
                { label: 'Lactation', value: 'LACTATION', description: 'Recommended for IBCLC and lactation specialists.' },
                { label: 'Emergency medicine (multiple sections)', value: 'GENERAL_MEDICINE_EMERGENCY', description: 'Recommended for emergency medicine doctors. Detailed sections like chief complaint, HPI, past medical history, social history, allergies, physical exam...' },
                { label: 'Emergency medicine (SOAP)', value: 'SOAP_EMERGENCY', description: 'Recommended for emergency medicine doctors. Follows the SOAP format.' },
                { label: 'Detailed sections (Well Child Care)', value: 'GENERAL_MEDICINE_WCC', description: 'Recommended for Well Child Care visits. Detailed sections like chief complaint, HPI, Well Child Care, past medical history, social history...' },
                { label: 'SOAP (Well Child Care)', value: 'SOAP_WCC', description: 'Recommended for Well Child Care visits. Follows the SOAP format.' }
            ]
        }
    },
    {
        id: 'SectionStyle',
        component: 'Selector',
        props: {
            label: 'Section Style',
            description: '',
            defaultValue: 'auto',
            options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Bullet Points', value: 'bullet_points' },
                { label: 'Paragraph', value: 'paragraph' }
            ]
        }
    },
];
