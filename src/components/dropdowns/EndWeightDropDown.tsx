'use client';

import { FC } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';

export interface EndWeightProps {
    id: string;
    selectedEndWeightValue: string;
    endWeight: any[];
    onWeightChange: (weightValue: string, weightPoint : number) => void;
}


// const EndWeightDropDown = ({selectedEndWeightValue, endWeight, onWeightChange}:EndWeightProps) => {
const EndWeightDropDown:FC<EndWeightProps> = ({id, selectedEndWeightValue, endWeight, onWeightChange}) => {
    return(
        <select
            defaultValue={selectedEndWeightValue} 
            className="h-8 px-5 border border-gray-400 shadow-md shadow-gray-300 w-full"
            aria-label="Select end weight"                       
            onChange={(e) => onWeightChange(e.target.value, 2)} id={id}>
            
            <option value='0' label="">End Weight</option>
            {endWeight.map((item:any) => {
                return(
                    <option key={item.weight} value={item.weight}>{item.weight}</option>
                )
            })}

        </select>
    );
}

export default EndWeightDropDown;