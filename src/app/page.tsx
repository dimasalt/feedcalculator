"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import AdgDropdown from "@/components/dropdowns/AdgDropDown";
import DefaultFeedsDropdown from "@/components/dropdowns/DefaultFeedsDropdown";
import EndWeightDropDown from "@/components/dropdowns/EndWeightDropDown";
import StartWeightDropDown from "@/components/dropdowns/StartWeightDropDown";

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


        <div className="container max-w-(--breakpoint-xl) grid md:grid-cols-5 row-span-1 mx-auto">
            <div className="w-full md:col-span-3 mt-8 pe-5">
                {/* <!-- drop down with available feeds for the current user --> */}
                <DefaultFeedsDropdown componentId="feed_select" />
            </div>
            
            {/* <!-- right side --> */}
            <div className="w-full md:col-span-2 md:row-span-2 mt-8">
                {/* <!-- feeds selected by user for calculations --> */}                          
                <SelectedFeedsTable componentId="selectedTableFeeds" />
            </div>
          

            <div className="w-full md:col-span-3 row-span-1 pe-5">
                 {/* <!-- calculator input form --> */}
                <form onSubmit={(e) => calculateRation(e)}>                    
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-8 shadow-md shadow-gray-300">                   
                        <div className="col-span-1">
                            <label htmlFor="weight_start_select">Weight Start</label>
                            <StartWeightDropDown selectedStartWeightValue={calculatorInputData.current.startWeight} onWeightChange={onWeightChange} />                            
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="weight_end_select">Weight End</label>
                            <EndWeightDropDown selectedEndWeightValue={calculatorInputData.current.endWeight} onWeightChange={onWeightChange} />                        
                        </div>                  
                        <div className="col-span-1 mt-5 md:mt-0">
                            <label htmlFor="adg_select">ADG (lb)</label>                                  
                            <AdgDropdown selectedAdgValue={calculatorInputData.current.selectedAdg} onAdgChange={onAdgChange} />                      
                        </div>
                        
                        <div className="col-span-1 mt-5 md:mt-0">
                            <label htmlFor="text_heads"># of Heads</label>
                            <input type="text" onChange={(e) => onHeadsChange(e.target.value)} className="rounded-none w-full border border-gray-400 h-10 ps-3" id="text_heads" />
                        </div>                           
                    </div>

                    <div className="grid grid-cols-4 mt-4">                              
                        <div className="col-span-2 col-start-2 md:col-span-1 md:col-start-4 flex md:justify-end">
                            <button className="btn btn-submit bg-dark-50 cursor-pointer" 
                                    type="submit" id="btn_calculate">
                                <i className="bi bi-calculator me-1"></i> 
                                Calculate 
                            </button>         
                        </div>                   
                    </div>
                </form>
            </div>
        </div>


        {/* <!-- tables with calculations --> */}
        {/* <!------------------- calculation results per weight --------------------> */}
        <div className="container max-w-(--breakpoint-xl) grid grid-cols-1 md:grid-cols-12 mt-10 mx-auto">
            {/* <!-- left side result display of calculations by weight and range --> */}
            <div className="col-span-1 md:col-span-7 mt-8">
                <CalculatorResultsForWeight rationResult={rationResult} />               
            </div>


            {/* <!-- right side for a bulk feed based on amount of animals on the farm --> */}
            <div className={rationBulkResult?.averageWeight ?? 0 > 0 ? 'col-span-1 md:col-span-5 mt-8 md:mt-6 md:ms-5 bg-white shadow-md' : 'hidden' } >
                <CalculatorResultsForBulk 
                    rationBulkResult={rationBulkResult} 
                    animalCount={calculatorInputData.current.heads} 
                />             
            </div>
        </div>
    </>
  );
}
