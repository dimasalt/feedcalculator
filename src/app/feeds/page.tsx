'use client';

import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';

import { Feed } from '@/types/Feed';

// zod validation schema
import { feedItemSchema } from '@/validations/schemas/FeedItemSchema';

import { feedGetService } from '@/services/feed/feedGetService';
import { feedRemoveService } from '@/services/feed/feedRemoveService';
import { feedAddService } from '@/services/feed/feedAddService';

import FeedRemovalModal from '@/components/modals/FeedRemovalModal';
import { FeedDisplayTable } from '@/components/tables/FeedDisplayTable';
import { FeedForm } from '../../components/inputforms/FeedForm';
import { useToast } from "@/components/ui/use-toast"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { addMessage } from '@/redux/features/errorMessage';

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
      
    //redux form errors display
    const formErrors: string[] = useSelector((state: RootState) => state.message.value);
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

        try {
            const response = await feedAddService(feedItem);           

            if(response.data.affectedRows > 0) 
            {   
                //get list of feeds from database                     
                getFeeds();
                

                //clear feed item
                clearFeedItem();


                toast({                
                    description: "Feed item has been successfully added",
                });
            }
        }
        catch(err){

            toast({
                variant: "destructive",                
                description: "Sorry, something went wrong! We couldn't add a new feed item",
            });

            throw new Error('Failed to save data');
        }
               
    }


    // <!-- when remove button got clicked show modal dialog  -->
    const onClickRemoveModal = (id: number) => {

        setFeedItem({
            id : id,
            feed_name: '',
            feed_cp : 0,
            feed_tdn : 0,
            feed_dm: 0,
            feed_type : 'Grain',
            feed_usage: 0,
            is_default: 0    
        });

        feedItem.id = id;

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
        try{
            const response = await feedRemoveService(feedItem.id);
            if(response.data.affectedRows > 0) {
                await getFeeds();               

                toast({
                    //variant: "destructive",
                    //title: "Feed Item Removal",
                    description: "Feed item has been successfully removed",
                });
            }              
        }
        catch(err){

            toast({
                //title: "Feed Item Removal",
                variant: "destructive",             
                description: "Oops..., Something went wrong, feed item couldn't be removed",
            });
             // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to save data');
        }
        finally{
            //reset feed item id
            feedItem.id = 0;       
            
            //hide modal            
            document.querySelector('#removeModal')?.classList?.add('hidden');           
        }           
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
        <div className='container pb-3 max-w-screen-xl mx-auto border-b-2'>
            <div className='flex justify-between mt-11'>
                <div className="flex justify-start">
                    <h2 className=" text-slate-700 text-4xl">                  
                        Feed Management   
                    </h2>
                </div>           
            </div>        
        </div>


        {/* <!-- error hundling for form input --> */}
        <div className='container max-w-screen-xl mx-auto mt-7'>           
            {formErrors.map((e) => {
                return (
                    <div className='bg-red-800 text-white shadow-md shadow-gray-300 col-span-9 text-lg p-4 mb-7 mt-0 transition duration-500 ease-in-out' key={e}>
                        <i className="bi bi-exclamation-circle text-white text-xl me-3"></i>
                        {e}
                    </div>
                );
            })}
        </div>


        {/* <!-- input fields for feed --> */}
        <FeedForm feedItem={feedItem} 
            hundleChange={hundleChange} 
            onClickClearAddFeedForm={onClickClearAddFeedForm} 
            hundleSumbit={hundleSumbit}   
        />
      

        <div className="container max-w-screen-xl mx-auto pt-14">
            <div className="flex justify-center">            
                {/* <!-- feeds display table --> */}
                <FeedDisplayTable feeds={feeds} onClickRemoveModal={onClickRemoveModal} />
            </div>
        </div>

        {/* <!-- Feeds and confirmation popup modal --> */}
        <FeedRemovalModal removeFeed={removeFeed} />    
    </>
  );
}
