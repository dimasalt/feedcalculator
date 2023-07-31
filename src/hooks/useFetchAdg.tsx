import { useEffect, useState } from "react";


// <!-- Fetch average daily gain for livestock -->
export const useFetchAdg = () => {

    const [adgs, setAdg] = useState<any[]>([]);    

    const getAdgs = async () => {
        const postData = {
            method: 'POST',
            Headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY
            },
            body: JSON.stringify({})  
        }
        const res = await fetch('/api/rations/adgs', postData);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }      
        
        const response = await res.json();
        
        setAdg(response.data[0]);
    }


    useEffect(() =>{
        getAdgs();
    }, []);
    

    return [adgs];
}