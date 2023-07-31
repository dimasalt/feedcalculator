import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";


  export interface SearchReqs {
    adg: number
    startWeight: number
    endWeight: number
  }
  

export const POST = async(request: NextRequest)=>  {
        
    const body: any = await request.json();

    try {
        const [rows, fields] = await promisePool.query('call feedGetRequirements(?,?,?)', [
            body.adg,
            body.startWeight,
            body.endWeight
        ]);

        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 