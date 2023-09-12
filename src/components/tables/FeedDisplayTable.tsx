

export interface FeedDisplayTableProps {
    feeds : any[],
    onClickRemoveModal: (id: number) => void
}


export const FeedDisplayTable = ({feeds, onClickRemoveModal}: FeedDisplayTableProps) => {

    return(
        <table className="table-auto w-full border border-gray-300 shadow-md shadow-gray-300">
            <thead>
                <tr>
                    <th scope="col" className="ps-2 py-2 text-lg w-1/3">Name</th>
                    <th scope="col" className="ps-2 py-2 text-lg">CP %</th>
                    <th scope="col" className="ps-2 py-2 text-lg">TDN %</th>
                    <th scope="col" className="ps-2 py-2 text-lg">DM %</th>
                    <th scope="col" className="ps-2 py-2 text-lg">Feed Type</th>
                    <th scope="col" className="ps-2 py-2 text-lg">Allowed Usage %</th>
                    <th scope="col" className="ps-2 py-2 text-lg"></th>
                </tr>
            </thead>
            <tbody>
                {feeds?.map((item) => {
                    return(
                        <tr key={item.id}>
                            <td className='ps-3 py-2 bg-white text-black font-normal'>{item.feed_name}</td>
                            <td className='ps-3 py-2 bg-white text-black'>{item.feed_cp }</td>
                            <td className='ps-9 py-2 bg-white text-black'>{item.feed_tdn}</td>
                            <td className='ps-9 py-2 bg-white text-black'>{item.feed_dm}</td>
                            <td className='ps-3 py-2 bg-white text-black'>{item.feed_type }</td>
                            <td className='ps-3 py-2 bg-white text-black'>{item.feed_usage}</td>
                            <td className='ps-3 py-2 bg-white text-black'>
                                { item.is_default === 0 ?
                                    // <!-- if feed is not default allow it to be removed -->
                                    <a href="#" className='text-2xl ms-2 group relative' onClick={() => onClickRemoveModal(item.id)}>                     
                                        <i className="bi bi-trash3 text-red-600 text-base me-5"></i>
                                        <span className="pointer-events-none absolute -top-7 -right-10 w-max rounded bg-gray-700 px-5 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                            Remove feed
                                        </span>                   
                                    </a>                 
                                    
                                    :'' //<!-- else render nothing -->                                    
                                }                                                                                          
                            </td>
                        </tr>                                    
                    )
                })}                       
            </tbody>
        </table>
    )
}