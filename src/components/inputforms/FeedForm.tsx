import { Feed } from '@/types/Feed';
import { FormEvent, MouseEvent } from 'react';


export interface FeedItemProps  {
    feedItem : Feed,
    hundleChange: (e: any ) => void,
    onClickClearAddFeedForm: (e: MouseEvent<HTMLButtonElement>) => void,
    hundleSumbit: (e: FormEvent<HTMLFormElement>) => void 
}


export const FeedForm = ({feedItem, hundleChange, onClickClearAddFeedForm, hundleSumbit} : FeedItemProps) => {
    return(
        <form onSubmit={(e) => hundleSumbit(e)} >
            <div className='container max-w-screen-xl mx-auto mt-7'>           
                <div className="grid grid-cols-3 md:grid-cols-9 gap-0 shadow-md shadow-gray-300">           
                    <div className='col-span-1 md:col-span-2'>
                        <label htmlFor="txt_feed_name" className='flex flex-wrap ps-2'>Feed Name</label>
                        <input type='text' value={feedItem.feed_name} onChange={(e) => hundleChange(e)} name='feed_name' className="h-9 w-full px-5 border border-gray-400" id="txt_feed_name" placeholder="Feed Name" />   
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <label htmlFor="text_feed_cp" className='flex flex-wrap ps-2'>CP %</label>
                        <input type='number' value={feedItem.feed_cp}  onChange={(e) => hundleChange(e)} name='feed_cp' className="h-9 w-full px-5 border border-gray-400" id="text_feed_cp" placeholder="CP %" />
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <label htmlFor="text_feed_tdn" className='flex flex-wrap ps-2'>TDN %</label>
                        <input type='number' value={feedItem.feed_tdn}  onChange={(e) => hundleChange(e)} name='feed_tdn' className="h-9 px-5 w-full border border-gray-400" id="text_feed_tdn" placeholder="TDN %" />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="text_dm" className="flex flex-wrap ps-2">DM %</label>
                        <input type='text' value={feedItem.feed_dm}  onChange={(e) => hundleChange(e)} name='feed_dm' className="h-9 w-full px-5 border border-gray-400" id="text_dm" placeholder="Dry Matter" />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="select_type" className='flex flex-wrap ps-2'>Feed Type</label>
                        <select value={feedItem.feed_type} onChange={(e) => hundleChange(e)} name='feed_type' className="h-9 w-full px-5 border border-gray-400" id="select_type">
                            <option value="Grain">Grain</option>     
                            <option value="Hay">Hay</option>        
                            <option value="Protein">Protein</option>           
                            <option value="Mineral">Mineral</option>                          
                            <option value="Salt">Salt</option>      
                        </select>                    
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="text_feed_usage" className='flex flex-wrap ps-2'>Usage %</label>
                        <input type='text' value={feedItem.feed_usage} onChange={(e) => hundleChange(e)} name='feed_usage' className="h-9 w-full px-5 border border-gray-400" id="text_feed_usage" placeholder="Usage %" />
                    </div>         
                    <div className="col-span-3 md:col-span-2">            
                        <button type='submit' className='h-9 mt-6 w-1/2 bg-green-800 text-white font-semibold'> 
                            <i className="bi bi-check2-circle text-white me-2"></i>
                            Add
                        </button>
                        <button className='h-9 w-1/2 bg-red-800 text-white font-semibold' onClick={(e) => onClickClearAddFeedForm(e)}> 
                            <i className="bi bi-x-circle text-white me-2"></i>
                            Clear
                        </button>              
                    </div>           
                </div>
            </div>
        </form>
    )
}