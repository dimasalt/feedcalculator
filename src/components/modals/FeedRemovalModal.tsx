'use client';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';

export interface DeleteModalProps {
  removeFeed: () => void
};


export default function Modal({removeFeed}: DeleteModalProps) {

  //<!-- display or hide modal dialog -->
  const toggleModal = ():void => {    
    document.querySelector('#removeModal')?.classList?.toggle('hidden');
  }

  return (
    <>
      <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="removeModal">
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <div className="inline-block align-center bg-red-700 text-white font-light text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div className='px-4 mt-2 py-2 text-center'>Are you sure you want to remove feed <strong className=' text-lg'>Test Feed Name Here</strong> ?</div>
            <div className=" grid grid-cols-10 bg-white py-5 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className=' col-span-2 pt-4'><i className="bi bi-exclamation-triangle text-red-800 text-6xl"></i></div>
              <div className='col-span-8 text-black font-light'>
                <p>
                  Are you sure you want to delete this item? 
                </p>
                <div className='alert bg-red-200 text-black py-2 px-3 mt-1 rounded shadow-sm shadow-red-300'>
                  Please be advised once item deleted this action cannot be reversed.
                </div>
              </div>            
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button type="button" className="py-2 px-5 btn btn-cancel font-semibold me-2 shadow-sm shadow-gray-500" onClick={toggleModal}>
                <i className="bi bi-x-circle text-white me-1"></i> 
                Cancel
              </button>
              <button type="button" className="py-2 px-5 btn btn-submit font-semibold me-2 shadow-sm shadow-gray-500" onClick={() => removeFeed()}>
                <i className="bi bi-check2-circle text-white me-1"></i> 
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}