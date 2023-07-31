
//<!-- gets feeds (default and the ones inserted by current user) -->
export const feedGetService = async() => {
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

    return response.data[0];   
}
