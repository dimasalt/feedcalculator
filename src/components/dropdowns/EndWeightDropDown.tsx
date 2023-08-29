'use client';

import { FC } from 'react';
import { useFetchWeight } from "@/hooks/useFetchWeight";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';

export interface EndWeightProps {
    selectedEndWeightValue: string;
    onWeightChange: (weightValue: string, weightPoint : number) => void;
}


// const EndWeightDropDown = ({selectedEndWeightValue, endWeight, onWeightChange}:EndWeightProps) => {
const EndWeightDropDown:FC<EndWeightProps> = ({selectedEndWeightValue, onWeightChange}) => {

    // call for custome hook
    const [endWeight]: any = useFetchWeight();

    return(
        <select
            defaultValue={selectedEndWeightValue} 
            className="h-8 px-5 border border-gray-400 shadow-md shadow-gray-300 w-full"
            aria-label="Select end weight"                       
            onChange={(e) => onWeightChange(e.target.value, 2)} id="weight_end_select">
            
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