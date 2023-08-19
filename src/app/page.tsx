"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import AdgDropdown from "@/components/dropdowns/AdgDropDown";
import DefaultFeedsDropdown from "@/components/dropdowns/DefaultFeedsDropdown";
import EndWeightDropDown from "@/components/dropdowns/EndWeightDropDown";
import StartWeightDropDown from "@/components/dropdowns/StartWeightDropDown";
import { useFetchAdg } from "@/hooks/useFetchAdg";
import { useFetchWeight } from "@/hooks/useFetchWeight";

import { SelectedFeedsTable } from "@/components/tables/SelectedFeedsTable";
import { CalcInData } from "@/types/CalcInData";
import { calculateFeedRequirement } from "@/utils/calculator";
import { CalcResultFeedBulk, CalcResultRation } from "@/types/CalcResultData";
import { useDispatch } from "react-redux";
import { calculatorSchema } from "@/validations/schemas/CalculatorSchema";
import { addMessage } from "@/redux/features/errorMessage";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import CalculatorResultsForWeight from "@/components/tables/CalculatorResultsForWeight";
import { CalculatorResultsForBulk } from "@/components/tables/CalculatorResultsForBulk";
import PageHeadline from "@/components/layout/PageHeadline";



export default function FeedCalculator() {

    //redux dispatch for setting error messages    
    const dispatch = useDispatch();   

    //results returned from calculations
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

        if(number === 1) // start weight           
            calculatorInputData.current.startWeight = value;          
        
        if(number === 2) //end weight            
            calculatorInputData.current.endWeight = value;  
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
        {/* <!-- page headline --> */}
        <PageHeadline headline="Calculator" />       
     

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
                        <div className="col-span-1 col-start-4 flex justify-end">
                            <button className="col-span-1 w-full h-9 bg-neutral-700 text-white text-lg rounded shadow-md shadow-gray-300 " 
                                    type="submit" id="btn_calculate">
                                <i className="bi bi-calculator me-2"></i> 
                                Calculate 
                            </button>         
                        </div>                   
                    </div>
                </form>
            </div>
            {/* <!-- end of left side --> */}


             {/* <!-- table to display information --> */}       
            {/* <!-- right side --> */}
            <div className=" w-5/12 ms-5 mt-8">
                {/* <!-- feeds selected by user for calculations --> */}                          
                <SelectedFeedsTable componentId="selectedTableFeeds" />
            </div>
            {/* <!-- end of right side --> */}
        </div>


        {/* <!------------------- calculation results per weight --------------------> */}
        <div className="container max-w-screen-xl mx-auto flex justify-start">
            {/* <!-- left side result display of calculations by weight and range --> */}
            <div className=" w-7/12 mt-8 ms-0">
                <CalculatorResultsForWeight rationResult={rationResult} />               
            </div>


            {/* <!-- right side for a bulk feed based on amount of animals on the farm --> */}
            <div className={rationBulkResult?.averageWeight ?? 0 > 0 ? 'w-5/12 mt-6 py-2 ms-5 bg-white shadow-md' : 'hidden' } >
                <CalculatorResultsForBulk 
                    rationBulkResult={rationBulkResult} 
                    animalCount={calculatorInputData.current.heads} 
                />             
            </div>
        </div>
    </>
  );
}
