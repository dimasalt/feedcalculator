'use client';

import Link from 'next/link';
import { memo } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';


const Navbar = () => {

    //toggles menu button from open to close and other way around
    const toggleMenu = (action: string) => {

        const burger = document.querySelector('#burger');
        const xClose = document.querySelector('#xClose');
        const smallMenu = document.querySelector('#smallMenu');

        if(action === 'open') {
            burger?.classList.add('hidden');
            xClose?.classList.remove('hidden');   
            smallMenu?.classList.remove('hidden');
        }            
        else if(action === 'close'){
            burger?.classList.remove('hidden');
            xClose?.classList.add('hidden');
            smallMenu?.classList.add('hidden');
        }
    }

    return (
        <>
            <nav className="flex justify-around shadow-md bg-dark-50 py-4 w-full">
                {/* <!-- logo and app name --> */}
                <div className=' w-full md:w-fit'>
                    <Link className=" text-gray-300 font-semibold text-2xl md:text-3xl" href="/">
                        <span className=' text-green-600 ms-3'>Feed</span> Calculator
                    </Link>                          
                </div>                    

                {/* <!-- an actual middle menu --> */}
                <div className=" text-gray-400 me-10 justify-center mt-2 text-lg hidden md:flex">                       
                    <Link className="hover:text-gray-100 me-8" id='test' href="/">
                        <i className="bi bi-calculator me-1"></i>
                        Calculator 222
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
                <div className=' text-gray-400 mt-2 hidden md:flex'>
                    <Link className=" hover:text-gray-100 me-3" href="/help">
                        <i className="bi bi-question-square me-2" ></i>
                        Help
                    </Link>              
                </div>

                <div className='text-gray-400 md:hidden shadow-sm' id="burger">
                    <i className="bi bi-list me-2 text-3xl" onClick={() => toggleMenu('open')}></i>
                </div>
                <div className='text-gray-400 hidden md:hidden shadow-sm' id='xClose'>         
                    <i className="bi bi-x text-3xl me-2" onClick={() => toggleMenu('close')}></i>
                </div>
            </nav>    

            {/* <!-- visible only on small screens and when button is clicked --> */}
            <ul className='bg-neutral-600 text-gray-400 py-2 flex-row justify-items-center w-full hidden md:hidden shadow-sm' id="smallMenu">
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8" id='test' href="/">
                            <i className="bi bi-calculator me-1"></i>
                            Calculator
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8" href="/feeds">
                            <i className="bi bi-flower2 me-1"></i>
                            Feeds
                        </Link>    
                    </div>
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8" href="/ration">
                            <i className="bi bi-egg me-1"></i> 
                            Ration
                        </Link>  
                    </div>                    
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className=" hover:text-gray-100 me-3" href="/help">
                            <i className="bi bi-question-square me-2" ></i>
                            Help
                        </Link>   
                    </div>           
                </li>
            </ul>       
        </>
    );
}

export default memo(Navbar);