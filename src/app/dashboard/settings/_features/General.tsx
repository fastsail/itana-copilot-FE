/**
 |--------------------------------------------------
 | Imports
 |--------------------------------------------------
 */
import React, { useState } from 'react';
import Setting from '../_components/Setting';
import { generalSettings, SettingDataProps } from '../_data/getSettings';
import { useDeviceName, useMicrophones } from '../_hooks';
import { SettingId, ComponentType } from '../enum';

/**
 |--------------------------------------------------
 | General Component
 |--------------------------------------------------
 | This component renders the general settings section
 | of the application.
 */
const General = () => {
  //-- State to manage settings --//
  const [settings, setSettings] = useState<SettingDataProps[]>(generalSettings);

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

  //-- Fetching Microphones and Device Name --//
  const microphones = useMicrophones();
  const deviceName = useDeviceName();

  return (
    <div className='flex flex-col gap-8'>
      {settings.map((setting) => {
        if (setting.id === SettingId.Microphone) {
          return (
            <Setting
              key={setting.id}
              type={ComponentType.Selector}
              options={microphones}
              props={setting.props} 
              value={setting.props.defaultValue}
              onChange={newValue => handleSettingChange(setting.id, newValue)}
            />
          );
        } else if (setting.id === SettingId.DeviceName) {
          return (
            <Setting
              key={setting.id}
              type={ComponentType.Default}
              options={[]}
              props={setting.props}
              value={deviceName}
              onChange={newValue => handleSettingChange(setting.id, newValue)}
            />
          );
        } else {
          return (
            <Setting
              key={setting.id}
              type={setting.component === ComponentType.Toggle ? ComponentType.Toggle : ComponentType.Selector}
              props={setting.props}
              value={setting.props.defaultValue}
              onChange={newValue => handleSettingChange(setting.id, newValue)}
            />
          );
        }
      })}
    </div>
  );
};

export default General;
