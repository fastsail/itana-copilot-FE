import * as React from 'react';

import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Props = {
	children: React.ReactNode;
	placeholder?: string;
	className?: string;
	onChange?: (value: string) => void;
	contentClassName?: string;
	label?: string;
};

/**
 *
 * @param children - HTML Element - Preferrably -  SelectItem from shadcn select component
 * @param placeholder - Placeholder value
 * @param className - Styling for the trigger button
 * @param onChange - To get the value of the selected item
 * @param label - Label for the select field
 * @param contentClassName - Styling for the content
 *
 */
export function SelectField({ children, placeholder, className, onChange, contentClassName, label }: Props) {
	//
	const [value, setValue] = React.useState<string>('');
	//
	return (
		<div>
			{label && <label className='text-sm font-light mb-2 flex'>{label}</label>}
			<Select
				onValueChange={(value) => {
					if (onChange) {
						onChange(value);
					}
					setValue(value);
				}}
			>
				<SelectTrigger
					className={cn(
						'w-[180px] rounded-md outline-none',
						value === '' ? 'font-light !text-xs !opacity-45' : 'opacity-100 text-slate-600',
						className
					)}
				>
					<SelectValue className={cn()} placeholder={placeholder ?? 'Select'} />
				</SelectTrigger>
				<SelectContent className={cn(contentClassName)}>
					<SelectGroup>{children}</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
