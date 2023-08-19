import React from 'react'

import { addMessage } from '@/redux/features/errorMessage';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';



interface ErrorDisplayProps  {
    componentID : string;
}

/**
 * @description Displays error messages on form inputs
 * @param componentID for ID 
 * @returns List and display of error messages
 */
const ErrorDisplay = ({componentID}: ErrorDisplayProps) => {

    //input form errors
    const formErrors: string[] = useSelector((state: RootState) => state.message.value);

    //redux dispatch for setting error messages    
    const dispatch = useDispatch();   

  return (
    <div className="container max-w-screen-xl mx-auto flex justify-around" id={componentID}>           
            {formErrors.map((item, index) => {                    
                return (                  
                    <div className='w-full mt-4 flex justify-around' key={index}>          
                        <div className='w-3/4 bg-red-800 text-white shadow-md shadow-gray-300 text-lg py-2 px-4'>
                            <i className="bi bi-exclamation-circle text-white text-xl me-3"></i>
                            {item}
                        </div>
                        <div className='w-1/4 bg-red-800 py-2 flex justify-end'>
                            <i className="bi bi-x-square text-white text-xl me-3 cursor-pointer" onClick={() => dispatch(addMessage(''))}></i>
                        </div>
                    </div>                  
                );
            })}
        </div>
  )
}

export default ErrorDisplay;