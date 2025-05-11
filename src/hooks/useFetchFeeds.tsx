import { Feed } from "@/types/Feed";
import { useEffect, useState } from "react";


// <!-- Fetch average daily gain for livestock -->
export const useFetchFeeds = () => {

    const [feeds, setFeeds] = useState<Feed[]>([]);    

    const getFeeds = async () => {
        const postData = {
            method: 'POST',
            Headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY
            },
            body: JSON.stringify({})  
        }
        const res = await fetch('/api/feeds/get', postData);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }      
            
        const response = await res.json();         
        
        setFeeds(response.data[0]);        
    }


    useEffect(() =>{
        getFeeds();
    }, []);
    

    return [feeds];
}