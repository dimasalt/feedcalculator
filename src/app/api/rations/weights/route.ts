import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";




export const POST = async(request: NextRequest)=>  {
    //const body = await request.json();

    try {
        const [rows,fields] = await promisePool.query('call feedGetRequirementsWeight()', []);
        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 