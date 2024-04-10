import React, { useState } from 'react';
import { notesSettings, SettingDataProps } from '../_data/getSettings';
import Setting from '../_components/Setting';

/**
 |--------------------------------------------------
 | Note Component
 |--------------------------------------------------
 | Component responsible for rendering the Note section.
 */
export default function Note() {
    //-- State to manage settings --//
    const [settings, setSettings] = useState<SettingDataProps[]>(notesSettings);

    // Effect to log settings whenever they change
    React.useEffect(() => {
        console.log('Settings:', settings);
    }, [settings]);

    /**
     |--------------------------------------------------
     | handleSettingChange Function
     |--------------------------------------------------
     | Function to handle changes in setting values.
     |
     | @param {string} id - ID of the setting to update.
     | @param {string | boolean} newValue - New value for the setting.
     */
    const handleSettingChange = (id: string, newValue: string | boolean) => {
        setSettings(prevSettings => {
            return prevSettings.map(setting => {
                if (setting.id === id) {
                    // Update setting with new value
                    return {
                        ...setting,
                        props: {
                            ...setting.props,
                            defaultValue: newValue,
                        },
                    };
                }
                return setting;
            });
        });
    };
    
    return (
        <div className='flex flex-col gap-8'>
            {settings.map(setting => (
                <Setting
                    key={setting.id}
                    type={setting.component}
                    props={setting.props} // Pass props directly to Setting component
                    value={setting.props.defaultValue} // Use defaultValue from props
                    onChange={newValue => handleSettingChange(setting.id, newValue)}
                />
            ))}
        </div>
    );
}
