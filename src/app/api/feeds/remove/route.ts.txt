
import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";

  
//item remove interface
export interface FeedItemId {
    id : number
}

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    const body = await request.json();
    const feedId: FeedItemId = body;

    try {
        const [rows,fields] = await promisePool.query('call feedDelete(?)', [
            feedId.id
        ]);

        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 