'use client';

import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { selectedFeedsApi } from "@/redux/service/selectedFeedsApi";


import { Feed } from '@/types/Feed';

// zod validation schema
import { feedItemSchema } from '@/validations/schemas/FeedItemSchema';

import { feedGetService } from '@/services/feed/feedGetService';
import { feedRemoveService } from '@/services/feed/feedRemoveService';
import { feedAddService } from '@/services/feed/feedAddService';

import FeedRemovalModal from '@/components/modals/FeedRemovalModal';

import PageHeadline from '@/components/layout/PageHeadline';
import { FeedDisplayTable } from '@/components/tables/FeedDisplayTable';
import { FeedForm } from '../../components/inputforms/FeedForm';
import { useToast } from "@/components/ui/use-toast"

import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/features/errorMessage';

import ErrorDisplay from '@/components/layout/ErrorDisplay';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../globals.css';




export default function Feeds() {

    // <!-- list of feeds -->
    const[feeds, setFeeds] = useState<any[]>([]);  
    const [feedItem, setFeedItem] = useState<Feed>({
        id : 0,
        feed_name: '',
        feed_cp : 0,
        feed_tdn : 0,
        feed_dm: 0,
        feed_type : 'Grain',
        feed_usage: 0,
        is_default: 0
    });
         

    const dispatch = useDispatch();   

    // use toast from shadcn
    const { toast } = useToast();

  
    // <!-- to get all feeds useEffect -->
    useEffect(() => {       
        dispatch(addMessage(''));

        getFeeds();

    }, [dispatch]);  


    //<!-- get all available feed (default and a person inserted feeds) -->
    const getFeeds = async() => {
        await feedGetService().then((result) => {
            setFeeds(result);
        });
    }
    

    //<!-- hundles form sumbition
    const hundleSumbit = (e: FormEvent) => {        

        //validate the user input
        hundleValidation();

        e.preventDefault();
    }

    //<!-- on form field change -->
    const hundleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value} = e.target; 
        setFeedItem({...feedItem, [name] : value});
    }


    // <!-- Hundles form validation -->
    const hundleValidation = async() =>
    {       
        //clearing all errors        
        dispatch(addMessage(''));

        try {
            // parsing form input to check for errors
            feedItemSchema.parse(feedItem);   
            
            //save the information into database if no errors
            addFeed(); 
        }
        catch(err: any) {           
            dispatch(addMessage(err.issues[0].message));          
        }                               
    }


    // <!-- add new feed to the list -->
    const addFeed = async() =>{     

        //get feeds from database
        const response = await feedAddService(feedItem);           
                    
        if(response.data === true) 
        {   
            //get list of feeds from database                     
            getFeeds();
            
            //clear feed item
            clearFeedItem();

            toast({                
                description: "Feed item has been successfully added",
            });
        }
        else{
            toast({
                variant: "destructive",                
                description: "Sorry, something went wrong! We couldn't add a new feed item",
            });
        }                       
    }


    // <!-- when remove button got clicked show modal dialog  -->
    const onClickRemoveModal = (id: number, feed_name: string) => {

        setFeedItem({
            id : id,
            feed_name: feed_name,
            feed_cp : 0,
            feed_tdn : 0,
            feed_dm: 0,
            feed_type : 'Grain',
            feed_usage: 0,
            is_default: 0    
        });

        feedItem.id = id;
        feedItem.feed_name = feed_name;

        document.querySelector('#removeModal')?.classList?.remove('hidden');
    }


    // <!-- clear add new feed form -->
    const onClickClearAddFeedForm = (e:  MouseEvent<HTMLButtonElement>) => {

        //prevent default form reload
        e.preventDefault();

        //clear feed item
        clearFeedItem();
     
        //clear error message
        dispatch(addMessage(''));
    }


    // <!-- call to remove feed service and remove selected feed item -->
    const removeFeed = async() => {          
      
        const response = await feedRemoveService(feedItem.id);
        if(response.data === true) {
            await getFeeds();               

            toast({
                //variant: "destructive",
                //title: "Feed Item Removal",
                description: "Feed item has been successfully removed",
            });


            /**
             * Have to invalidate cache of selected user feeds in redux toolkit
             * When feed is removed from the feed table, it's also removed from the 
             * user selected table, but redux toolkit doesn't know about it and needs
             * to be told to refetch the query instead of using an old cached one.
             */
            dispatch(selectedFeedsApi.util.invalidateTags(['SelectedFeeds']));              
        }              
        else{
            toast({
                //title: "Feed Item Removal",
                variant: "destructive",                
                description: "Oops..., Something went wrong, feed item couldn't be removed",
            });
        }         
        
        //reset feed item id
        feedItem.id = 0;       
            
        //hide modal            
        document.querySelector('#removeModal')?.classList?.add('hidden');                  
    }

    // <!-- clears and resets FeedItem -->
    const clearFeedItem = () => {
        setFeedItem({
            id : 0,
            feed_name: '',
            feed_cp : 0,
            feed_tdn : 0,
            feed_dm: 0,
            feed_type : 'Grain',
            feed_usage: 0,
            is_default: 0
        });        
    }

  return (
    <>
        {/* <!-- table to display information --> */}       
        <PageHeadline headline='Feed Management' />      
        

        {/* <!-- error hundling for form input --> */}  
        <ErrorDisplay componentID="errorDisplayId" />             


        {/* <!-- input fields for feed --> */}
        <FeedForm feedItem={feedItem} 
            hundleChange={hundleChange} 
            onClickClearAddFeedForm={onClickClearAddFeedForm} 
            hundleSumbit={hundleSumbit}   
        />
      

        <div className="container max-w-(--breakpoint-xl) mx-auto pt-14" >
            <div className="flex justify-center">            
                {/* <!-- feeds display table --> */}
                {feeds.length > 0 && (
                    <FeedDisplayTable feeds={feeds} onClickRemoveModal={onClickRemoveModal} />
                )}
            </div>
        </div>

        {/* <!-- Feeds and confirmation popup modal --> */}
        <FeedRemovalModal removeFeed={removeFeed} feedName={feedItem.feed_name} />    
    </>
  );
}
