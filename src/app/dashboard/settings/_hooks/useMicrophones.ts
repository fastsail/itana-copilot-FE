/**
 |--------------------------------------------------
 | useMicrophones Hook
 |--------------------------------------------------
 | This hook fetches available microphones and provides them as state.
*/
import { useState, useEffect } from 'react';
import { detectAvailableMicrophones } from '../detectAvailableMic';

type Microphone = {
    value: string;
    label: string;
};

export const useMicrophones = () => {
    const [microphones, setMicrophones] = useState<Microphone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMicrophones = async () => {
            const availableMicrophones = await detectAvailableMicrophones();
            setMicrophones(availableMicrophones);
            setLoading(false); // Set loading to false after fetching microphones
        };

        fetchMicrophones();
    }, []);

    return { microphones, loading };
};
