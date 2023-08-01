
import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //get variables
    const body = await request.json();       
    const id = body.id;

    //temporary token
    //const userToken:string = '1';

     //get user token
     const cookie = request.cookies.get('token');
     const userToken:string = cookie?.value ?? '';    

    try {
        const [rows, fields] = await promisePool.query('call feedAddSelected(?, ?)', [
            id,
            userToken
        ]);

        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 