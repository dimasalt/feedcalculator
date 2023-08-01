
import { RootState } from '@/redux/store/store';
import React from 'react'
import { useSelector } from 'react-redux';


interface ErrorDisplayProps  {
    componentID : string;
}

/**
 * @description Displays error messages on form inputs
 * @param componentID for ID 
 * @returns List and display of error messages
 */
function ErrorDisplay({componentID}: ErrorDisplayProps) {

    //input form errors
    const formErrors: string[] = useSelector((state: RootState) => state.message.value)

  return (
    <div className="container max-w-screen-xl mx-auto flex justify-around" id={componentID}>           
            {formErrors.map((e) => {                    
                return (
                    <>
                        <div className='w-full mt-4'>          
                            <div className='bg-red-800 text-white shadow-md shadow-gray-300 text-lg py-2 px-4' key={e}>
                                <i className="bi bi-exclamation-circle text-white text-xl me-3"></i>
                                {e}
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
  )
}

export default ErrorDisplay;