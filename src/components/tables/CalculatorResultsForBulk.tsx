import { CalcResultFeedBulk } from "@/types/CalcResultData";

interface CalcRationBulkProps {
    rationBulkResult?: CalcResultFeedBulk;
    animalCount: number;
}

export const CalculatorResultsForBulk = ({rationBulkResult, animalCount}: CalcRationBulkProps) => {
    return (
        <>
          <div className="w-full mt-2 border-b-2 border-neutral-100 border-opacity-100 py-2 px-2 dark:border-opacity-50 font-semibold bg-dark-50 text-white">
                For a total of {animalCount} animals with average weight of {rationBulkResult?.averageWeight} lbs
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
        </>
    )
}

