/**
 |--------------------------------------------------
 | useDeviceName Hook
 |--------------------------------------------------
 | This hook fetches the device name and provides it as state.
*/
import { getDeviceName } from "../getDeviceName";
import { useState, useEffect } from 'react';

export const useDeviceName = () => {
    const [deviceName, setDeviceName] = useState('Loading...');

    useEffect(() => {
        const fetchDeviceName = async () => {
            const name = await getDeviceName();
            setDeviceName(name || 'Unknown');
        };

        fetchDeviceName();
    }, []);

    return deviceName;
};
