'use client';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '../../app/globals.css';


//ration table props (gets array of values)
export interface RationTableProps {
    ration: any[]
}


//<-- displays ration table -->
const RationTable = ({ration}: RationTableProps) => {
    
    return(
        <table className="table-auto w-full border border-gray-300 shadow-md shadow-gray-300">
            <thead>
                <tr>
                    <th scope="col" className="ps-2 py-2 text-lg">Weight</th>
                    <th scope="col" className="ps-2 py-2 text-lg">Animal Type</th>
                    <th scope="col" className="ps-2 py-2 text-lg">Average Daily Gain (ADG)</th>
                    <th scope="col" className="ps-2 py-2 text-lg">CP %</th>
                    <th scope="col" className="ps-2 py-2 text-lg">TDN %</th>
                    <th scope="col" className="ps-2 py-2 text-lg">Dry Matter Per Day</th>
                </tr>
            </thead>
            <tbody>
                {ration.map((item:any) => {
                    return(
                        <tr key={item.id}>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.weight}</td>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.animal_type }</td>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.adg}</td>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.cp }</td>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.tdn}</td>
                            <td className='px-2 py-2 bg-white text-black border-b'>{item.dm_per_day}</td>
                        </tr>                                    
                    )
                })}                       
            </tbody>
        </table>
    );    

};

export default RationTable;