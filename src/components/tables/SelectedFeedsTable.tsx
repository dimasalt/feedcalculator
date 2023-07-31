import { useGetSelectedFeedsQuery, useRemoveSelectedFeedMutation } from "@/redux/service/selectedFeedsApi";
import { Feed } from "@/types/Feed"
import { toast } from "../ui/use-toast";


// selected feed display table props
export interface SelectedFeedsTableProps {
    componentId : string   
}

export const SelectedFeedsTable = ({componentId} : SelectedFeedsTableProps) => {

    //redux RTK query hooks
    const { data, error, isLoading } = useGetSelectedFeedsQuery();
    const [deleteSelectedFeed] = useRemoveSelectedFeedMutation();


    //removing feed
    const onClickSelectedFeedRemove = (id: number = 0) => {
        //update table     
        deleteSelectedFeed(id);

        toast({                                 
            description: "Feed item has been successfully removed",
        });
    };

    return(
        <>
        <div className={ data?.length ?? 0 > 0 ? 'hidden' : ' bg-orange-200 text-slate-700 shadow-md shadow-gray-300 col-span-9 text-lg p-4 mb-7 mt-7'}>
            <i className="bi bi-exclamation-circle text-slate-600 text-xl me-3"></i>  
            Please add some default feeds to enable calculations                                      
        </div>
        <div className={ data?.length === 0 ? 'hidden' : '' }>
            <h2 className="text-lg font-normal">Selected Feeds</h2>
            <table className="table-auto w-full border h-8 border-gray-300 shadow-md shadow-gray-300" id={componentId}>
                <thead>
                    <tr>
                        <th className="ps-3 text-lg text-gray-300 w-60 border-r">Name</th>
                        <th className="ps-2 text-lg text-gray-300 w-11 border-r">CP%</th>
                        <th className="ps-2 text-lg text-gray-300 w-11 border-r">TDN%</th>                               
                        <th className="ps-2 text-lg text-gray-300 w-11 border-r">DM%</th>    
                        <th className="ps-2 text-lg text-gray-300 w-11 border-r">Usage%</th>    
                        <th className="ps-2 text-lg text-gray-300 w-6"></th>
                    </tr>
                </thead>
                <tbody>                        
                    { data?.map((item: Feed) =>{
                        return (                            
                            <tr key={item.feed_name}>
                                <td className=" bg-white h-8 ps-3 font-semibold">{item.feed_name}</td>
                                <td className=" bg-white h-8 ps-3 text-center">{item.feed_cp}</td>
                                <td className=" bg-white h-8 ps-3 text-center">{item.feed_tdn}</td>
                                <td className=" bg-white h-8 ps-3 text-center">{item.feed_dm}</td>
                                <td className=" bg-white h-8 ps-3 text-center">{item.feed_usage}</td>
                                <td className=" bg-white h-8 ps-3 text-center">                                      
                                    <a href="#" className='text-2xl ms-2 group relative' onClick={() => onClickSelectedFeedRemove(item.id)}> 
                                        <i className="bi bi-trash3 me-2 text-red-600 text-base"></i>
                                        <span className="pointer-events-none absolute -top-7 -right-10 w-max rounded bg-gray-700 px-5 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                            Remove Feed
                                        </span>                   
                                    </a>                 
                                </td>
                            </tr>                                                              
                        )})
                    }                      
                </tbody>
            </table>
        </div>
        </>
    )
}