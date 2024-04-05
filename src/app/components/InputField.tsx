import { cn } from '@/lib/utils';
import { UseFormRegister } from 'react-hook-form';

interface IFormValues {
	[key: string]: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	register?: UseFormRegister<IFormValues>;
	label?: string;
}

// The following component is an example of your existing Input Component
export function InputField({ label, register, required, name, className, ...rest }: InputProps) {
	return (
		<>
			<label className='text-sm font-light'>{label}</label>
			<input
				{...rest}
				{...(register && register(name as string))}
				className={cn(
					'h-[52px] outline-[#36A477] px-4 placeholder:text-slate-200 placeholder:text-sm w-full mt-1 border rounded-md',
					className
				)}
			/>
		</>
	);
}
