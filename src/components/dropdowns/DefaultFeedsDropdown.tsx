import { useFetchFeeds } from "@/hooks/useFetchFeeds";
import { addMessage } from "@/redux/features/errorMessage";
import { useAddSelectedFeedMutation } from "@/redux/service/selectedFeedsApi";
import { Feed } from "@/types/Feed";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "../ui/use-toast";
import { selectedFeedItemSchema } from "@/validations/schemas/FeedSelectSchema";


export interface DefaultFeedsDropdownProps {
    componentId : string
}

//drop down with available feeds for user
const DefaultFeedsDropdown = ({componentId} : DefaultFeedsDropdownProps) => {

     // <!-- get feeds -->
    const [feeds]:Feed[][] = useFetchFeeds() ;
    //selected feed item to pass up to a page to update selected feeds table
    const feedId = useRef('0'); 

    //feed add selectedFeed redux hook
    const [addSelectedFeed] = useAddSelectedFeedMutation();

    // dispatch to set future error messages
    const dispatch = useDispatch();

    
    //on dropdown selected feed change
    const onFeedChange = (id: string) => {
        feedId.current = '0';

        if(id !== '0'){
            feedId.current = id;   

            //reset error message
            dispatch(addMessage(''));
        }       
    }

    //submit new item for insertion
    const hundleSelectedFeedSumbit = async(e: FormEvent) => {      
      
        //preventing page from reload
        e.preventDefault();

        //if feed id is not 0 only then insert it
        try {
            //validate
            const id:number = parseInt(feedId.current);
            selectedFeedItemSchema.parse({id : id});               
            
            addSelectedFeed(id);        

            //reset error message
            dispatch(addMessage(''));    
            
            //display success message
            toast({                
                description: "New default feed has been added",
            });
        }
        catch(err){
            dispatch(addMessage('Feed selection cannot be empty'));       
        }        
    }
    return(
        <>
            <form onSubmit={(e) => hundleSelectedFeedSumbit(e)} >           
                <div className="w-full">
                   
                    <h2 className="text-lg font-normal">Feed and Starting inputs (<Link className="text-green-700" href="/ration" prefetch={false}>feed requirements table</Link>)</h2>
                    <select                       
                        className="h-8 px-5 border border-gray-400 shadow-md shadow-gray-300 w-3/4"
                        aria-label="Select adg"               
                        onChange={(e) => onFeedChange(e.target.value)} id={componentId}>
                        
                        <option value='0' key='0' label=""></option>
                        {feeds.map((item:any) => {
                            return(
                                <option key={item.id} value={item.id}>{item.feed_name}</option>
                            )
                        })}
                    </select>
                    <button type="submit" className="h-8 px-5 w-1/4 bg-green-800 text-white font-semibold shadow-md shadow-gray-300  
                            hover:bg-green-900 hover:scale-105 hover:ease-in hover:duration-200" id="btn_feedSubmit">
                        <i className="bi bi-check2-circle me-2"></i> 
                        Add Selected 
                    </button>                   
                </div>                       
            </form>
        </>
    )
}


export default DefaultFeedsDropdown;