
import * as z from 'zod';


export const calculatorSchema = z.object({
    //feed_name: z.string({required_error: 'Feed Name is required', invalid_type_error: "Feed name must be a string" })
    startWeight: z.coerce.number()
                .int({message: 'Start Weight has to be a whole number and cannot include decimal points'})
                .min(1, {message : 'Start Weight cannot be 0'}),             

    endWeight: z.coerce.number({invalid_type_error: "End Weight has to be a number"})   
                .int({message: 'End weight has to be a whole number and cannot include decimal points'})
                .min(1, {message : 'End Weight cannot be 0'}),             

    selectedAdg: z.coerce.number({invalid_type_error: "Average Daily Gain has to be a number"})                                     
                .min(1, '(ADG) Total Digestable Nutrients cannot be zero'),   

    heads: z.coerce.number({invalid_type_error: "Animal count has to be a number"})                   
                .int({message: 'Animal count has to be a whole number and cannot include decimal points'})                              
                .min(1, 'Animal count has to be between at least 1')
  });
