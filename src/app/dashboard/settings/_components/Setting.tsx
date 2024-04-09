/**
 |--------------------------------------------------
 | Imports
 |--------------------------------------------------
 */
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { SelectItem } from '@/components/ui/select';
import { SelectField } from '@/app/components/SelectField';

/**
 |--------------------------------------------------
 | Define ToggleSetting Props Interface
 |--------------------------------------------------
 | Defines the properties expected by the ToggleSetting component.
 */
type ToggleSettingProps = {
    defaultValue: boolean;
    label: string;
    description?: string;
    options?: SelectorOption[]; // Optional options for future use
};

/**
 |--------------------------------------------------
 | ToggleSetting Component
 |--------------------------------------------------
 | Renders a setting with a toggle switch.
 */
const ToggleSetting: React.FC<ToggleSettingProps> = ({ defaultValue, label, description }) => (
    <div className='flex justify-between items-start gap-4 w-full max-w-[600px] border-b pb-6'>
        <div className='flex flex-col gap-1'>
            <span className='text-xs md:text-sm font-semibold'>{label}</span>
            <span className='text-xs md:text-sm font-light text-slate-500'>{description}</span>
        </div>
        <div className='flex items-center space-x-2'>
            <Switch id='airplane-mode' defaultChecked={defaultValue} />
        </div>
    </div>
);

/**
 |--------------------------------------------------
 | Define SelectorOption Type
 |--------------------------------------------------
 | Defines the structure of options used in SelectorSetting.
 */
type SelectorOption = {
    label: string;
    value: string;
};

/**
 |--------------------------------------------------
 | Define SelectorSetting Props Interface
 |--------------------------------------------------
 | Defines the properties expected by the SelectorSetting component.
 */
type SelectorSettingProps = {
    label: string;
    defaultValue: string;
    description?: string;
    options: SelectorOption[];
};

/**
 |--------------------------------------------------
 | SelectorSetting Component
 |--------------------------------------------------
 | Renders a setting with a select dropdown.
 */
const SelectorSetting: React.FC<SelectorSettingProps> = ({ label, defaultValue, description, options }) => (
    <div className='flex justify-between items-center flex-wrap gap-4 w-full max-w-[600px]'>
        <div className='flex flex-col gap-1 sm:max-w-[60%]'>
            <span className='text-xs md:text-sm font-semibold'>{label}</span>
            <span className='text-xs font-light text-slate-500'>{description}</span>
        </div>
        <SelectField className='h-12 border border-black/20' onChange={(e) => console.log(e)}>
            {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectField>
    </div>
);

/**
 |--------------------------------------------------
 | Define DefaultSetting Props Interface
 |--------------------------------------------------
 | Defines the properties expected by the DefaultSetting component.
 */
 type DefaultSettingProps = {
    label: string;
    defaultValue: string;
    description?: string;
    options?: SelectorOption[]; //
}

/**
 |--------------------------------------------------
 | DefaultSetting Component
 |--------------------------------------------------
 | Renders a setting with a default value.
 */
const DefaultSetting: React.FC<DefaultSettingProps> = ({ label, defaultValue }) => (
    <div className='flex justify-between items-center w-full flex-wrap gap-4 max-w-[600px] border-b pb-6'>
        <div className='flex flex-col gap-1'>
            <span className='text-xs md:text-sm font-semibold'>{label}</span>
        </div>
        <div className='flex h-12 border rounded-md w-full max-w-[180px] px-4'>
            <span className='font-light text-xs md:text-sm flex items-center justify-center'>{defaultValue}</span>
        </div>
    </div>
);

/**
 |--------------------------------------------------
 | Define Setting Props Union Type
 |--------------------------------------------------
 | Combines the different prop interfaces for ToggleSetting and SelectorSetting.
 */
export type SettingProps = ToggleSettingProps | SelectorSettingProps;

/**
 |--------------------------------------------------
 | Setting Component
 |--------------------------------------------------
 | Renders a setting based on the provided type (Toggle, Selector, or Default).
 */
const Setting: React.FC<SettingProps & { type: 'Toggle' | 'Selector' | 'Default' }> = ({ type, ...props }) => {
    if (type === 'Toggle') {
        return <ToggleSetting {...props as ToggleSettingProps} />;
    } else if (type === 'Selector' && 'options' in props) {
        return <SelectorSetting {...props as SelectorSettingProps} />;
    } else if (type === 'Default') {
        return <DefaultSetting {...props as DefaultSettingProps} />;
    }
    return null; // Handle potential invalid types gracefully
};

export default Setting;
