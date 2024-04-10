/**
 |--------------------------------------------------
 | Imports
 |--------------------------------------------------
 */
import { SelectField } from '@/app/components/SelectField';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import React from 'react';

/**
 |--------------------------------------------------
 | Define ToggleSetting Props Interface
 |--------------------------------------------------
 | Defines the properties expected by the 
 |ToggleSetting component.
 */
 type ToggleSettingsProp = {
    defaultValue: boolean;
    label: string;
    description?: string;
    onChange?: (value: boolean) => void;
    value?: boolean;
};

/**
 |--------------------------------------------------
 | ToggleSetting Component
 |--------------------------------------------------
 | Renders a setting with a toggle switch.
 */
 const ToggleSetting: React.FC<ToggleSettingsProp> = ({ defaultValue, label, description, onChange, value }) => {
    return (
        <div className='flex justify-between items-start gap-4 w-full max-w-[600px] border-b pb-6'>
            <div className='flex flex-col gap-1'>
                <span className='text-xs md:text-sm font-semibold'>{label}</span>
                <span className='text-xs md:text-sm font-light text-slate-500'>{description}</span>
            </div>
            <div className='flex items-center space-x-2'>
                <Switch 
                    id='airplane-mode' 
                    defaultChecked={defaultValue} 
                    onCheckedChange={onChange}
                />
            </div>
        </div>
    );
};

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
type SelectorSettingsProp = {
    label: string;
    defaultValue: string;
    description?: string;
    options: SelectorOption[];
    onChange?: (value: string) => void; // onChange handler for select dropdown
    value?: string; // Current value of the select dropdown
};

/**
 |--------------------------------------------------
 | SelectorSetting Component
 |--------------------------------------------------
 | Renders a setting with a select dropdown.
 */
const SelectorSetting: React.FC<SelectorSettingsProp> = ({ label, defaultValue, description, options, onChange, value }) => (
    <div className='flex justify-between items-center flex-wrap gap-4 w-full max-w-[600px]'>
        <div className='flex flex-col gap-1 sm:max-w-[60%]'>
            <span className='text-xs md:text-sm font-semibold'>{label}</span>
            <span className='text-xs font-light text-slate-500'>{description}</span>
        </div>
        <SelectField className='h-12 border border-black/20' onChange={onChange}>
            {options.map((option, index) => (
                <SelectItem key={index} value={option.value} defaultValue={value}>
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
type DefaultSettingsProp = {
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
const DefaultSetting: React.FC<DefaultSettingsProp> = ({ label, defaultValue }) => (
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
 type SettingsProp<T> = {
    type: 'Toggle' | 'Selector' | 'Default';
    props: T;
    value?: any;
    options?: SelectorOption[];
    defaultValue?: string;
    onChange?: (newValue: string | boolean) => void;
};

/**
 |--------------------------------------------------
 | Setting Component
 |--------------------------------------------------
 | Renders a setting based on the provided type (Toggle, Selector, or Default).
 */
const Setting: React.FC<SettingsProp<any>> = ({ type, props, value, onChange, options }) => {
    if (type === 'Toggle') {
        return <ToggleSetting {...props as ToggleSettingsProp} onChange={onChange} defaultValue={value} />;
    } else if (type === 'Selector') {
        return <SelectorSetting {...props as SelectorSettingsProp} onChange={onChange} defaultValue={value} />;
    } else if (type === 'Default') {
        return <DefaultSetting {...props as DefaultSettingsProp} defaultValue={value} />;
    }
    return null; // Handle potential invalid types gracefully
};

export default Setting;
