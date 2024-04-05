import React, { useContext } from 'react';

export type View = 'Welcome' | 'Specialty' | 'Privacy' | 'Email' | 'Verification';
export type Context = {
	setActiveView: React.Dispatch<React.SetStateAction<View>>;
	setProgress: React.Dispatch<React.SetStateAction<number>>;
	incrementValue: number;
};

/**
|--------------------------------------------------
| Context
|--------------------------------------------------
*/
export const SignupContext = React.createContext<Context | null>(null);

export function useSignupContext() {
	const context = useContext(SignupContext);
	return context as Context;
}
