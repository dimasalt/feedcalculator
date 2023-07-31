import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';
import React from 'react';

export interface AdgDropdownProps {
    id: string;
    selectedAdgValue: string;
    onAdgChange: (e : string) => void;
    adgs: string[];
}

/**
 * Can also use :any instead of :AdgDropdownProps
 * ----------------------------------------------------------
 * Also both type and interface work the same
 */
const AdgDropdown:React.FC<AdgDropdownProps> = ({id, selectedAdgValue, onAdgChange, adgs}) => {
    
    return(
        <select          
            defaultValue={selectedAdgValue}
            className="h-8 px-5 border border-gray-400 shadow-md shadow-gray-300 w-full"
            aria-label="Select adg"          
            onChange={(e) => onAdgChange(e.target.value)} id={id}>
            
            <option value='0' label="">ADG</option>
            {adgs.map((item:any) => {
                return(
                    <option key={item.adg} value={item.adg}>{item.adg}</option>
                )
            })}

        </select>
    );
}

export default AdgDropdown;