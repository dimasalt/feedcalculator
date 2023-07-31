'use client';

import Script from "next/script";
import { useEffect } from "react";


export interface TooltipInterface {
    parentId: string;
    message: string;
}

const Tooltip = ({parentId, message} : TooltipInterface) => {

    //apply classes to parent element 
    useEffect(() => {
        document.querySelector('#' + parentId)?.classList.add('group', 'relative');
    });
    

    return ( 
        <span className="pointer-events-none absolute -top-7 -right-10 w-max rounded bg-gray-700 px-5 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
            {message}
        </span>              
    );
}

export default Tooltip;