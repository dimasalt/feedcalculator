export const rationService = async(selectedAdgValue:string, selectedStartWeight:string, selectedEndWeight:string) => {

    const postData = {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY
        },
        body: JSON.stringify({
            adg: selectedAdgValue,
            startWeight: selectedStartWeight,
            endWeight : selectedEndWeight
        })  
    }

    const res = await fetch('/api/rations/feedintake', postData);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }      
    

    const response = await res.json();
    const ration = response.data[0];   

    return ration;
};