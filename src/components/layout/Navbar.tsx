import Link from 'next/link';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';


export default function Navbar() {
    return (
        <>
            <nav className="flex justify-between shadow-md bg-neutral-600 py-3">
                {/* <!-- logo and app name --> */}
                <div className=''>
                    <Link className=" text-gray-300 font-semibold text-3xl" href="/">
                        <span className=' text-green-600 ms-3'>Feed</span> Calculator
                    </Link>                          
                </div>                    

                {/* <!-- an actual middle menu --> */}
                <div className=" text-gray-400 me-10 flex justify-center mt-2 text-lg">                       
                    <Link className="hover:text-gray-100 me-8" id='test' href="/">
                        <i className="bi bi-calculator me-1"></i>
                        Calculator
                    </Link>
                    <Link className="hover:text-gray-100 me-8" href="/feeds">
                        <i className="bi bi-flower2 me-1"></i>
                        Feeds
                    </Link>    
                    <Link className="hover:text-gray-100" href="/ration">
                        <i className="bi bi-egg me-1"></i>
                        Ration
                    </Link>                                                                          
                </div>

                {/* <!-- right side --> */}
                <div className=' text-gray-400 mt-2'>
                    <Link className=" hover:text-gray-100 me-3" href="/help">
                        <i className="bi bi-question-square me-2"></i>
                        Help
                    </Link>              
                </div>
            </nav>           
        </>
    );
}