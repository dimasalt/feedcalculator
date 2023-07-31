import { Feed } from "@/types/Feed";
import { object } from "zod";


//<!-- adds feed to database -->

export const feedAddService = async(feedItem: Feed) => {
    const postData = {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY
        },
        body: JSON.stringify(feedItem)
    }
    const res = await fetch('/api/feeds/add', postData);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }      
    
    const response = await res.json();   
    
    return response;
}