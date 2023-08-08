import Link from "next/link";
import { FormEvent, useRef } from "react";

import { useDispatch } from "react-redux";
import { useAddSelectedFeedMutation, useGetSelectedFeedsQuery } from "@/redux/service/selectedFeedsApi";


import { useFetchFeeds } from "@/hooks/useFetchFeeds";
import { addMessage } from "@/redux/features/errorMessage";

import { Feed } from "@/types/Feed";

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


     // dispatch to set error messages
     const dispatch = useDispatch();
    //feed add selectedFeed redux hook
    const [addSelectedFeed] = useAddSelectedFeedMutation();    
    //selected feeds table records
    const { data, error, isLoading } = useGetSelectedFeedsQuery();

    
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
       
        try {
            //validate
            const id:number = parseInt(feedId.current);
            selectedFeedItemSchema.parse({id : id});  
            
            //no duplicates
            let noDuplicates: boolean = true;

            //check for duplicates // for some reason data?.some method did not work
            data?.forEach(item => {
                if(item.id === id) noDuplicates = false;
            });


            if(noDuplicates === true){        
                //add feed to the selected feed table
                addSelectedFeed(id);     

                //reset error message
                dispatch(addMessage(''));    
                
                //display success message
                toast({                
                    description: "New selected feed has been added",
                });
            }
            else{
                //display success message
                toast({      
                    variant: "destructive",          
                    description: "We're sorry but the feed you have selected, is already in selected feeds table",
                });
            }                       
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