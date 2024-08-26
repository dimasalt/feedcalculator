'use client';

import { useEffect, useRef, useState } from "react";

//components
import AdgDropdown from '@/components/dropdowns/AdgDropDown';
import StartWeightDropDown from '@/components/dropdowns/StartWeightDropDown';
import EndWeightDropDown from '@/components/dropdowns/EndWeightDropDown';

import { WeightsInterface } from "@/hooks/useFetchWeight";
import { rationService } from "@/services/ration/rationService";

import RationTable from "@/components/tables/RationTable";

import '../globals.css';



export default function Ration() {

    //start and end weight
    const weights: WeightsInterface = {
        startValue : '200',
        endValue : '400'
    }

    // adg -> average daily gain and weights
    const selectedAdg = useRef<string>('0'); 
    const selectedStartWeight = useRef<string>(weights.startValue);
    const selectedEndWeight = useRef<string>(weights.endValue);



    //rations for the selected daily rations/messures
    const [ration, setRation] = useState<any[]>([]);

    
    //calls rationService which makes call to API and gets ration in assigned range from mysql database
    const callRationService = async () => {
        await rationService(selectedAdg.current, selectedStartWeight.current, selectedEndWeight.current)
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
        else if(number === 2) //end weight
            selectedEndWeight.current = value;

        callRationService();
    }


    return (    
        <>
        {/* <!-- table to display information --> */} 
        <div className='container max-w-screen-xl mx-auto mt-10'>

            <div className='grid grid-cols-1 md:grid-cols-5 mb-5'>

                <div className="flex col-span-4 md:col-span-2 mb-2">
                    <h2 className=" text-slate-700 text-2xl md:text-4xl">Ration Requirements</h2>
                </div>           

                <div className="col-span-4 md:col-span-1">
                    <label htmlFor="adg_select" className="sr-only">Average Daily Gain</label>
                    <AdgDropdown selectedAdgValue={selectedAdg.current} onAdgChange={onAdgChange} />
                </div>
                <div className="col-span-4 md:col-span-1">
                    <label htmlFor="weight_start_select" className="sr-only">Average Daily Gain</label>
                    <StartWeightDropDown selectedStartWeightValue={selectedStartWeight.current} 
                        onWeightChange={onWeightChange} />                
                </div>    

                <div className="col-span-4 md:col-span-1">
                    <label htmlFor="weight_end_select" className="sr-only">Average Daily Gain</label>
                    <EndWeightDropDown selectedEndWeightValue={selectedEndWeight.current} 
                        onWeightChange={onWeightChange} />                   
                </div>                          
              
            </div>
        </div>

        
        <div className="container max-w-screen-xl mx-auto">
            <div className='flex justify-end mt-2'>
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