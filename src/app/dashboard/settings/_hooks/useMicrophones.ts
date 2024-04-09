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

    useEffect(() => {
        const fetchMicrophones = async () => {
            const availableMicrophones = await detectAvailableMicrophones();
            setMicrophones(availableMicrophones);
        };

        fetchMicrophones();
    }, []);

    return microphones;
};