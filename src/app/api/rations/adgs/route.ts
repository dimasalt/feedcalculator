import promisePool from "@/utils/mysql";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

//   interface Adgs extends RowDataPacket{
//     adg: string,
//     value: number
//   }

  

  // export interface SearchReqs {
  //   adg: number
  //   start_weight: number
  //   end_weight: number
  // }
  
export const POST = async(request: NextRequest)=>  {
    //const body = await request.json();

    try {
        const [rows,fields] = await promisePool.query('call feedGetRequirementsAdg()', []);
        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 