import { useEffect, useState } from 'react';
import { ApiResponse } from '../type';

const useAuthenticated = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //-- Fetch data from the endpoint --//
                console.log('Fetched settings')
                const response = await fetch('/api/authenticated');
                const responseData = await response.json() as ApiResponse;
                
                setData(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    
        return () => {
            // Cleanup if necessary
        };
    }, []);

    return { data, loading };
};

export default useAuthenticated;
