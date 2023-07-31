import { useEffect, useRef, useState } from "react";

// start and end weight interface
export interface WeightsInterface {
    startValue: string,
    endValue: string
};


//fetch weights for start and end weight dropdowns
export const useFetchWeight = () => {

    //start weight 
    const [startWeight, setStartWeights] = useState<any[]>([]);    
    const [endWeight, setEndWeights] = useState<any[]>([]);    


    const getWeights = async () => {
        const postData = {
            method: 'POST',
            Headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY
            },
            body: JSON.stringify({})  
        }
        const res = await fetch('/api/rations/weights', postData);

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data');
        }      
        
        const response = await res.json();
        
  
        /** <!-- set all weights -->
         *  start weight full list and default selected start weight for the drop down
         */
        setStartWeights(response.data[0]);         
       

        // end weight and default selected end weight for the drop down
        setEndWeights(response.data[0]);             
    }

    useEffect(() =>{
    
        getWeights();
    
    }, []);

    return [startWeight, endWeight];
}