'use client';

import { useEffect, useRef, useState } from "react";

//components
import AdgDropdown from '@/components/dropdowns/AdgDropDown';
import StartWeightDropDown from '@/components/dropdowns/StartWeightDropDown';
import EndWeightDropDown from '@/components/dropdowns/EndWeightDropDown';

import { useFetchAdg } from "@/hooks/useFetchAdg";
import { WeightsInterface, useFetchWeight } from "@/hooks/useFetchWeight";
import { rationService } from "@/services/ration/rationService";

import RationTable from "@/components/tables/RationTable";

import '../globals.css';



export default function Ration() {

    //start and end weight
    const weights: WeightsInterface = {
        startValue : '200',
        endValue : '400'
    }

    // adg -> average daily gain
    const selectedAdg = useRef<string>('0'); 
    const[adgs]:any = useFetchAdg();


    //weights
    const selectedStartWeight = useRef<string>(weights.startValue);
    const selectedEndWeight = useRef<string>(weights.endValue);

    // call for custome hook
    const [startWeight, endWeight]: any = useFetchWeight();

    //rations for the selected daily rations/messures
    const [ration, setRation] = useState<any[]>([]);

    
    //calls rationService which makes call to API and gets ration in assigned range from mysql database
    const callRationService = () => {
        rationService(selectedAdg.current, selectedStartWeight.current, selectedEndWeight.current)
        .then((result) => {            
            setRation(result);
        });        
    }


    useEffect(()=> {        
        callRationService();        
    }, []);
    


    //change selected ADG
    const onAdgChange = (value: string) => {
        selectedAdg.current = value;

        callRationService();
    }

    //<!-- change selected weight -->
    const onWeightChange = (value:string, number: number) => {
        
        if(number === 1) // start weight
            selectedStartWeight.current = value;
        
        if(number === 2) //end weight
            selectedEndWeight.current = value;

        callRationService();
    }


    return (    
        <>
        {/* <!-- table to display information --> */}       
        <div className='container max-w-screen-xl mx-auto'>

            <div className='flex justify-between mt-11 border-b-2 pb-3'>
                <div className="flex justify-start">
                    <h2 className=" text-slate-700 text-4xl">Ration Requirements</h2>
                </div>           

                {/* <!-- Page name and Search and sort options --> */}
                <div className="flex justify-end pe-0">                   
                    <div className="">
                        <label htmlFor="adg_select" className=" sr-only">Average Daily Gain</label>
                        <AdgDropdown selectedAdgValue={selectedAdg.current} 
                            onAdgChange={onAdgChange} adgs={adgs} id="adg_select" />
                    </div>
                    <div>
                        <label htmlFor="weight_start_select" className=" sr-only">Average Daily Gain</label>
                        <StartWeightDropDown selectedStartWeightValue={selectedStartWeight.current} 
                            onWeightChange={onWeightChange} startWeight={startWeight} id="weight_start_select" />                
                    </div>    

                    <div>
                        <label htmlFor="weight_end_select" className=" sr-only">Average Daily Gain</label>
                        <EndWeightDropDown selectedEndWeightValue={selectedEndWeight.current} 
                            onWeightChange={onWeightChange} endWeight={endWeight} id="weight_end_select" />                   
                    </div>                          
                </div>
            </div>
        </div>
        
        <div className="container max-w-screen-xl mx-auto">
            <div className='flex justify-end mt-9'>
                <span className='pe-1 font-semibold text-sm'>* All weights calculated in lbs</span>
            </div>


            {/* <!-- display ration --> */}
            <div className="flex justify-center">       
                <RationTable ration={ration} />              
            </div>
        </div>        
    </>
    );
  }