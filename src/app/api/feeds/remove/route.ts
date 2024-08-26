
import promisePool from "@/utils/mysql";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

  
//item remove interface
export interface FeedItemId {
    id : number
}

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    const body = await request.json();
    const feedId: FeedItemId = body;

    //prisma client
    const prisma = new PrismaClient();

    try {
        //remove selected feed based on feed id
        const feed = await prisma.feed.delete({
            where: {
                id: feedId.id
            }
        });

        return new NextResponse(JSON.stringify({data: true}));   
    }
    catch(error){
        console.log(error);
        return new NextResponse(JSON.stringify({data: false}));   
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }
} 