
import * as z from 'zod';


export const feedItemSchema = z.object({
    //feed_name: z.string({required_error: 'Feed Name is required', invalid_type_error: "Feed name must be a string" })
    feed_name: z.string()
                .min(2, {message : 'Feed name is required and has to be between 2 and 20 characters'})
                .max(20, {message : 'Feed name is required and has to be between 2 and 20 characters'}),                   

    feed_cp: z.coerce.number({invalid_type_error: "Crude Protein % has to be a number"}) 
                .int({message: 'Crude protein has to be a whole number and cannot include decimal points'})
                .max(100, {message: 'Crude protein has to be between 1 and 100%'})
                .min(1, {message: 'Crude protein has to be between 1 and 100%'}),

    feed_tdn: z.coerce.number({invalid_type_error: "Total digestable nutrients has to be a number"})    
                .int({message: 'Total digestable nutrients has to be a whole number and cannot include decimal points'})                
                .max(100, 'Total digestable nutrients has to be between 1 and 100%')
                .min(1, 'Total digestable nutrients has to be between 1 and 100%'),   

    feed_dm: z.coerce.number({invalid_type_error: "Dry matter has to be a number"})                   
                .int({message: 'Dry matter has to be a whole number and cannot include decimal points'})               
                .max(100, 'Dry matter has to be between 1 and 100%')
                .min(1, 'Dry matter has to be between 1 and 100%'),                  

    feed_usage: z.coerce.number()
                .int({message: 'Feed usage has to be a whole number and cannot include decimal points'})               
                .max(100, 'Feed usage has to be between 1 and 100%')
                .min(1, 'Feed usage has to be between 1 and 100%')                    
  });
