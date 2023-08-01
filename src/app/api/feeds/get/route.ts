
import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //const body = await request.json();   

    //get user token
    const cookie = request.cookies.get('token');
    const userToken:string = cookie?.value ?? '';

    // const userToken: string = '1';

    
    try {
        const [rows,fields] = await promisePool.query('call feedGetAll(?)', [
            userToken
        ]);

        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 