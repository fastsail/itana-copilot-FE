export const generalSettings = [
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