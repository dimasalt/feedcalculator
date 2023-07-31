
// <!-- remove on selected feed item -->
export const feedRemoveService = async(id?: number) => {

    //hide modal
    document.querySelector('#removeModal')?.classList?.toggle('hidden');

    const postData = {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY
        },
        body: JSON.stringify({id : id})  
    }
    const res = await fetch('/api/feeds/remove', postData);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to save data');
    }      
    
    const response = await res.json();  
    
    return response;
    
    // if(response.data.affectedRows > 0) {
    //      //get feeds
    //     getFeeds();
    // }    
    
    // // //reset feed item id
    // feedItem.id = 0;
}