'use client';

import Link from 'next/link';
import { memo } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';


import { MdGrass, MdOutlineCompassCalibration } from "react-icons/md";
import { FiDivideSquare, FiHelpCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

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
            <nav className="flex justify-around shadow-md py-4 w-full">
                {/* <!-- logo and app name --> */}
                <div className=' w-full md:w-fit'>
                    <Link className=" text-gray-300 font-semibold text-2xl md:text-3xl" href="/">
                        <span className=' text-green-600 ms-3'>Feed</span> Calculator
                    </Link>                          
                </div>                    

                {/* <!-- an actual middle menu --> */}
                <div className=" text-gray-400 me-10 justify-center mt-2 text-lg hidden md:flex">                       
                    <Link className="hover:text-gray-100 me-8 flex items-center" id='test' href="/">                       
                        {/* <BiCalculator className='me-1 h-5 w-5' /> */}
                        <FiDivideSquare className='me-1 h-5 w-5' />
                        Calculator
                    </Link>
                    <Link className="hover:text-gray-100 flex items-center me-8" href="/feeds">                    
                        <MdGrass className='me-1 h-5 w-5' />
                        Feeds
                    </Link>    
                    <Link className="hover:text-gray-100 flex items-center" href="/ration">
                        <MdOutlineCompassCalibration className='me-1 h-5 w-5' />
                        Ration
                    </Link>                                                                          
                </div>

                {/* <!-- right side --> */}
                <div className=' text-gray-400 mt-2 hidden md:flex'>
                    <Link className=" hover:text-gray-100 me-3 flex items-center" href="/help">
                        <FiHelpCircle className='me-1 h-5 w-5' />                        
                        Help
                    </Link>              
                </div>

                <div className='text-gray-400 md:hidden shadow-sm' id="burger">
                    {/* <i className="bi bi-list me-2 text-3xl" onClick={() => toggleMenu('open')}></i> */}
                    <GiHamburgerMenu className="text-3xl me-2" onClick={() => toggleMenu('open')} />
                </div>
                <div className='text-gray-400 hidden md:hidden shadow-sm' id='xClose'>         
                    {/* <i className="bi bi-x text-3xl me-2" onClick={() => toggleMenu('close')}></i> */}
                    <IoMdClose className="text-3xl me-2" onClick={() => toggleMenu('close')} />
                </div>
            </nav>    

            {/* <!-- visible only on small screens and when button is clicked --> */}
            <ul className='bg-neutral-600 text-gray-400 py-2 flex-row justify-items-center w-full hidden md:hidden shadow-sm' id="smallMenu">
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8 flex items-center" id='test' href="/">                         
                           <FiDivideSquare className='me-1 h-5 w-5' />
                            Calculator
                        </Link>
                    </div>
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8 flex items-center" href="/feeds">
                             <MdGrass className='me-1 h-5 w-5' />
                            Feeds
                        </Link>    
                    </div>
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className="hover:text-gray-100 me-8 flex items-center" href="/ration">
                            <MdOutlineCompassCalibration className='me-1 h-5 w-5' />
                            Ration
                        </Link>  
                    </div>                    
                </li>
                <li>
                    <div className='w-full flex justify-start ms-10'>
                        <Link className=" hover:text-gray-100 me-3 flex items-center" href="/help">
                            <FiHelpCircle className='me-1 h-5 w-5' />               
                            Help
                        </Link>   
                    </div>           
                </li>
            </ul>       
        </>
    );
}

export default memo(Navbar);