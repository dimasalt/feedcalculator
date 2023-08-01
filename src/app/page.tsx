"use client";

import AdgDropdown from "@/components/dropdowns/AdgDropDown";
import DefaultFeedsDropdown from "@/components/dropdowns/DefaultFeedsDropdown";
import EndWeightDropDown from "@/components/dropdowns/EndWeightDropDown";
import StartWeightDropDown from "@/components/dropdowns/StartWeightDropDown";
import { useFetchAdg } from "@/hooks/useFetchAdg";
import { useFetchWeight } from "@/hooks/useFetchWeight";
import { FormEvent, useEffect, useRef, useState } from "react";


import { SelectedFeedsTable } from "@/components/tables/SelectedFeedsTable";
import { CalcInData } from "@/types/CalcInData";
import { calculateFeedRequirement } from "@/utils/calculator";
import { CalcResultFeedBulk, CalcResultRation } from "@/types/CalcResultData";
import { useDispatch } from "react-redux";
import { calculatorSchema } from "@/validations/schemas/CalculatorSchema";
import { addMessage } from "@/redux/features/errorMessage";
import ErrorDisplay from "@/components/layout/ErrorDisplay";



export default function FeedCalculator() {

    //redux dispatch for setting error messages    
    const dispatch = useDispatch();   

    const [rationResult, setRationResult] = useState<CalcResultRation[]>([]);
    const [rationBulkResult, setRationBulkResult] = useState<CalcResultFeedBulk>();  

    //information
    const calculatorInputData = useRef <CalcInData>({
        selectedAdg: '0',
        startWeight: '0',
        endWeight: '0',
        heads: 0,
        selectedFeeds: [],
        ration: [],
        normalizedFeeds: []
    });

    // <!-- clear any outstanding error messages -->
    useEffect(() => {       
        dispatch(addMessage(''));           
    }, [dispatch]);  


    // <!-- Average daily gain -->
    const[adgs]:any = useFetchAdg();

    // <!-- call for custom hook to get start weight and end weight -->
    const [startWeight, endWeight]: any = useFetchWeight();
    

    //<!-- change selected weight -->
    const onWeightChange = (value:string, number: number) => {

        if(number === 1){ // start weight           
            calculatorInputData.current.startWeight = value;          
        }
        
        if(number === 2){ //end weight            
            calculatorInputData.current.endWeight = value;  
        }
    }
  

    // <!-- change selected ADG -->
    const onAdgChange = (value: string) => {
        calculatorInputData.current.selectedAdg = value;       
    } 

    const onHeadsChange = (numHeads: string) => {
        calculatorInputData.current.heads = parseInt(numHeads);
    }

    // <!-- feed ration calculate -->
    const calculateRation = async(e: FormEvent) => {        
        e.preventDefault();       

        try{
            calculatorSchema.parse(calculatorInputData.current);           
            
            let result: any = await calculateFeedRequirement(calculatorInputData.current);            
            setRationResult(result.rationResult);
            setRationBulkResult(result.bulkResult);

            //reset any existing errors
            dispatch(addMessage(''));         
        }
        catch(err:any){
            //take the first error message and set it
            dispatch(addMessage(err.issues[0].message));
        }                 
    }

  return (
    <>              
        {/* <!-- table to display information --> */}       
        <div className='container max-w-screen-xl mx-auto'>
            <div className='flex justify-between mt-11 border-b-2 pb-3'>
                <div className="flex justify-start">
                    <h2 className="text-slate-700 text-4xl">Calculator</h2>
                </div>                          
            </div>
        </div>
     

         {/* <!-- error hundling for form input --> */}  
         <ErrorDisplay componentID="errorDisplayId" />                  
         

        <div className="container max-w-screen-xl mx-auto flex justify-around">                      
            {/* <!-- left side --> */}
            <div className=" w-7/12 mt-8 me-5">               
                
                {/* <!-- drop down with available feeds for the current user --> */}
                <DefaultFeedsDropdown componentId="feed_select" />
                

                <form onSubmit={(e) => calculateRation(e)}>
                {/* <!-- calculator input form --> */}
                <div className="grid grid-cols-4 mt-8 shadow-md shadow-gray-300">                   
                    <div className="col-span-1">
                        <label htmlFor="weight_start_select">Weight Start</label>
                        <StartWeightDropDown selectedStartWeightValue={calculatorInputData.current.startWeight} onWeightChange={onWeightChange} startWeight={startWeight} id="weight_start_select" />                            
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="weight_end_select">Weight End</label>
                        <EndWeightDropDown selectedEndWeightValue={calculatorInputData.current.endWeight} onWeightChange={onWeightChange} endWeight={endWeight} id="weight_end_select" />                        
                    </div>                  
                    <div className="col-span-1">
                        <label htmlFor="adg_select">ADG (lb)</label>                                  
                        <AdgDropdown selectedAdgValue={calculatorInputData.current.selectedAdg} onAdgChange={onAdgChange} adgs={adgs} id="adg_select" />                      
                    </div>
                    
                    <div className="col-span-1">
                        <label htmlFor="text_heads"># of Heads</label>
                        <input type="text" onChange={(e) => onHeadsChange(e.target.value)} className="rounded-none w-full border border-gray-400 h-8 ps-3" id="text_heads" />
                    </div>                           
                </div>

                <div className="grid grid-cols-4 mt-4">            
                    {/* onChange={(e) => onAdgChange(e.target.value)}                             */}
                    {/* <div className="col-span-1">
                        <label htmlFor="selectCold" className=" sr-only"></label>             
                        <select defaultValue =""
                            className="h-8 px-1 border border-gray-400 shadow-md shadow-gray-300 w-full"
                            aria-label="Select Temperature" id="selectCold">                          
                            <option value='0' label="">Cold (F)</option>
                            <option value='-5' label="">-5</option>
                            <option value='-20' label="">-20</option>
                            <option value='-25' label="">-25</option>
                            <option value='-40' label="">-40</option>                         
                        </select>
                    </div> */}
                    <div className="col-span-1 col-start-4 flex justify-end">
                        <button className="col-span-1 w-full h-9 bg-neutral-700 text-white rounded-none shadow-md shadow-gray-300 font-semibold" 
                                type="submit" id="btn_calculate">
                            <i className="bi bi-calculator me-2"></i> 
                            Calculate 
                        </button>         
                    </div>                   
                </div>
                </form>
            </div>
            {/* <!-- end of left side --> */}



            {/* <!-- right side --> */}
            <div className=" w-5/12 ms-5 mt-8">
                {/* <!-- feeds selected by user for calculations --> */}                          
                <SelectedFeedsTable componentId="selectedTableFeeds" />
            </div>
            {/* <!-- end of right side --> */}
        </div>


        {/* <!------------------- calculation results --------------------> */}
        <div className="container max-w-screen-xl mx-auto flex justify-start">
            {/* <!-- left side --> */}
            <div className=" w-7/12 mt-8 ms-0">
                <table className={ rationResult.length === 0 ? 'hidden' :  'table-auto w-full border h-8 border-gray-300 shadow-md shadow-gray-300'}>
                    <thead>
                        <tr>
                            <th scope="col" className="py-2 text-base text-center">Weight</th>
                            <th scope="col" className="py-2 text-base text-center">ADG</th>                           
                            <th scope="col" className="py-2 text-base text-center">Protein (lbs)</th>
                            <th scope="col" className="py-2 text-base text-center">Grain (lbs)</th>
                            <th scope="col" className="py-2 text-base text-center">Hay (lbs)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rationResult.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td className="ps-3 py-2 bg-white text-black text-center border-b">{item.weight}</td>
                                    <td className="ps-3 py-2 bg-white text-black text-center border-b">{item.adg}</td>
                                    <td className="ps-3 py-2 bg-white text-black text-center border-b">{item.proteinLb}</td>
                                    <td className="ps-3 py-2 bg-white text-black text-center border-b">{item.grainLb}</td>
                                    <td className="ps-3 py-2 bg-white text-black text-center border-b">{item.hayTotLb}</td>
                                </tr>
                            )
                        })}                     
                    </tbody>
                </table>
            </div>

            {/* <!-- right side --> */}
            <div className={rationBulkResult?.averageWeight ?? 0 > 0 ? 'w-5/12 mt-6 py-2 ms-5 bg-white shadow-md' : 'hidden' } >
                <div className="w-full border-b-2 border-neutral-100 border-opacity-100 py-2 px-2 dark:border-opacity-50 font-semibold bg-neutral-800 text-white">
                    For a total of {calculatorInputData.current.heads} animals with average weight of {rationBulkResult?.averageWeight} lbs
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 flex justify-between font-medium">
                    <span>Daily Protein Intake</span> <strong>{rationBulkResult?.proteinDaily} lbs</strong>
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 flex justify-between font-medium">
                    Daily Grain Intake <strong>{rationBulkResult?.grainDaily} lbs</strong>                  
                </div>              
                <div className="w-full border-t border-gray-300 py-2 px-3 flex justify-between font-medium">
                    Daily Hay Intake <strong>{rationBulkResult?.hayDaily} lbs</strong>
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 bg-gray-200">
                    {rationBulkResult?.dailyFeedBreakDown.map((item, index) => {
                        return(
                            <p className="w-full text-sm" key={index}>{item.feedName} - {item.feedVolume} lbs</p>
                        )}
                    )} 
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 flex justify-between font-medium">
                    Twice a Day Protein <strong>{rationBulkResult?.proteinTwiceADay} lbs</strong>
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 flex justify-between font-medium">
                    Twice a Day Grain <strong>{rationBulkResult?.grainTwiceADay} lbs</strong>
                </div>
                <div className="w-full border-t border-gray-30t py-2 px-3 flex justify-between font-medium">
                    Twice a Day Hay <strong>{rationBulkResult?.hayTwiceADay} lbs</strong>
                </div>
                <div className="w-full border-t border-gray-300 py-2 px-3 bg-gray-200">
                    {rationBulkResult?.twiceDayFeedBreakDown.map((item, index) => {
                        return(
                            <p className="w-full text-sm" key={index}>{item.feedName} - {item.feedVolume} lbs</p>
                        )}
                    )}  
                </div>                                    
            </div>
        </div>
    </>
  );
}
