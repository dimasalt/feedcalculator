import Link from "next/link";
import { FormEvent, useRef } from "react";

import { useDispatch } from "react-redux";
import { useAddSelectedFeedMutation, useGetSelectedFeedsQuery } from "@/redux/service/selectedFeedsApi";
import { addMessage } from "@/redux/features/errorMessage";

import { useFetchFeeds } from "@/hooks/useFetchFeeds";
import { Feed } from "@/types/Feed";

import { selectedFeedItemSchema } from "@/validations/schemas/FeedSelectSchema";

import { toast } from "../ui/use-toast";



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
                <div className="grid grid-cols-1 md:grid-cols-7">
                 {/* <div className="w-full">                    */}
                    <div className="col-span-1 md:col-span-7">
                        <h2 className="text-lg font-normal w-full">Feed and Starting inputs (<Link href="/ration" className="text-link" prefetch={false}>feed requirements table</Link>)</h2>                                
                    </div>
                    <div className=" col-span-1 md:col-span-5">                                     
                        <select                           
                            aria-label="Select default feed"               
                            onChange={(e) => onFeedChange(e.target.value)} id={componentId}>
                            
                            <option value='0' key='0' label=""></option>
                            {feeds.map((item:any) => {
                                return(                                    
                                    <option key={item.id} value={item.id}>{item.feed_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">                   
                        <button type="submit" className="btn btn-submit hover:scale-105 hover:ease-in hover:duration-200 w-full" id="btn_feedSubmit">
                            <i className="bi bi-check2-circle me-2"></i> 
                            Add Selected 
                        </button>                   
                    </div>
                </div>                       
            </form>
        </>
    )
}


export default DefaultFeedsDropdown;