'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

type Props = {
	callback: () => void;
};
function useClickOutside({ callback }: Props) {
	const ref = React.useRef<HTMLDivElement | null>(null);

	function handleClickOutside(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			callback();
		}
	}

	React.useEffect(() => {
		// Attach the event listener when the component mounts
		document.addEventListener('click', handleClickOutside);

		// Detach the event listener when the component unmounts
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [callback, handleClickOutside]);

	// Return the ref that should be attached to the component you want to detect clicks outside of
	return ref;
}

export default useClickOutside;
