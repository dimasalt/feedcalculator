import { CalcResultRation } from "@/types/CalcResultData";

interface CalcResultRationProps  {
    rationResult: CalcResultRation[]
}


export const CalculatorResultsForWeight = ({rationResult}: CalcResultRationProps) => {
    return(
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
    )
}


export default CalculatorResultsForWeight;