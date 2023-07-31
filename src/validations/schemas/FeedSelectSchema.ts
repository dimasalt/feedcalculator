
import * as z from 'zod';


export const selectedFeedItemSchema = z.object({   
    id: z.coerce.number({required_error: 'Selected feed is required', invalid_type_error: "Selected feed is required" })              
                .min(1, 'Selected feed is required')
  });
