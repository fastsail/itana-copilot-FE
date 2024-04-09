import Setting from '../_components/Setting';
import { generalSettings } from '../_data/getSettings';
import { useDeviceName, useMicrophones } from '../_hooks';

/**
 |--------------------------------------------------
 | General Component
 |--------------------------------------------------
 | This component renders the general settings section
 | of the application.
 */
const General = () => {
  /**
   |--------------------------------------------------
   | Fetching Microphones and Device Name
   |--------------------------------------------------
   | Fetches available microphones and device name using hooks.
   */
  const microphones = useMicrophones();
  const deviceName = useDeviceName();

  /**
   |--------------------------------------------------
   | Rendering Settings
   |--------------------------------------------------
   | Iterates over general settings and renders appropriate
   | Setting component based on type (Microphone, DeviceName, etc.)
   */
  return (
    <div className='flex flex-col gap-8'>
      {generalSettings.map(({ id, component, props }) => {
        if (id === 'Microphone') {
          return (
            <Setting
              key={id}
              type="Selector"
              {...props}
              options={microphones}
            />
          );
        } else if (id === 'DeviceName') {
          return (
            <Setting
              key={id}
              type="Default"
              {...props}
              options={[]}
              defaultValue={deviceName}
            />
          );
        } else {
          return (
            <Setting
              key={id}
              type={component === 'Toggle' ? 'Toggle' : 'Selector'}
              {...props}
            />
          );
        }
      })}
    </div>
  );
};

export default General;