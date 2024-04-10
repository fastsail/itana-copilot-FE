/**
 |--------------------------------------------------
 | Imports
 |--------------------------------------------------
 */
import React, { useEffect, useState } from 'react';
import Setting from '../_components/Setting';
import { useDeviceName, useMicrophones } from '../_hooks';
import { ComponentType, SettingId } from '../enum';
import { SettingDataProps } from '../type';
import { Spinner } from '../../_components';

/**
 |--------------------------------------------------
 | General Component
 |--------------------------------------------------
 | This component renders the general settings section
 | of the application.
 */

interface GeneralProps {
  data: SettingDataProps[];
}

const General: React.FC<GeneralProps> = ({ data =[] }) => {
  //-- State to manage settings --//
  const [settings, setSettings] = useState<SettingDataProps[]>(data);

  // Effect to log settings whenever they change
  // React.useEffect(() => {
  //   console.log('Settings:', settings);
  // }, [settings]);

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
  const {loading: isLoadingMics, microphones} = useMicrophones();
  const deviceName = useDeviceName();

  if (isLoadingMics) return <Spinner />;

  return (
    <div className='flex flex-col gap-8'>
     {settings.map((setting) => {
       if (setting.id === SettingId.Microphone && microphones.length > 1) {
         return (
           <Setting
             key={setting.id}
             type={ComponentType.Selector}
             props={{...setting.props, options: microphones }}
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
