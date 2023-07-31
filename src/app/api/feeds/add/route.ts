
import promisePool from "@/utils/mysql";

import { NextRequest, NextResponse } from "next/server";
import { Feed } from '../../../../types/Feed';

  
/** Adding new feed to the list */
export const POST = async(request: NextRequest) =>  {
    const body = await request.json();   

    const feedItem: Feed = body;

    const userToken:string = '1';

    try {
        const [rows,fields] = await promisePool.query('call feedCreate(?,?,?,?,?,?,?,?)', [
            feedItem.feed_name,
            feedItem.feed_cp,
            feedItem.feed_tdn,
            feedItem.feed_dm,
            feedItem.feed_type,
            feedItem.feed_usage,
            feedItem.is_default,
            userToken
        ]);
        return new NextResponse(JSON.stringify({data: rows}));   
    }
    catch(error){
        throw error;
    }
} 