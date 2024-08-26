'use client';

import { useFetchWeight } from "@/hooks/useFetchWeight";

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';


export interface StartWeightProps {   
    selectedStartWeightValue: string;   
    onWeightChange: (weightValue: string, weightPoint : number) => void;
}



const StartWeightDropDown = ({selectedStartWeightValue, onWeightChange}:StartWeightProps) => {    

    // call for custome hook
    const [startWeight]: any = useFetchWeight();

    return(
        <select
            defaultValue={selectedStartWeightValue}         
            aria-label="Select start weight"                       
            onChange={(e) => onWeightChange(e.target.value, 1)} id="weight_start_select">
            
            <option value='0' label="">Start Weight</option>
            {startWeight.map((item:any) => {
                return(
                    <option key={item.weight} value={item.weight}>{item.weight}</option>
                )
            })}
        </select>
    );
}

export default StartWeightDropDown;
