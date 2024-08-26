
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //const body = await request.json();   

    //get user token
    const cookie = request.cookies.get('token');
    const userToken:string = cookie?.value ?? '';

    //prisma client
    const prisma = new PrismaClient();

    try {
        //get all feeds
        const feeds = await prisma.feed.findMany({
            where: {
                OR: 
                [
                    {
                        user_token: userToken
                    },
                    {
                        is_default: 1
                    }
                ]
            }
        });

        return new NextResponse(JSON.stringify({data: [feeds]}));
    } 
    catch 
    {
        //otherwise return nothing
        return new NextResponse(JSON.stringify({data: []}));
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }
} 