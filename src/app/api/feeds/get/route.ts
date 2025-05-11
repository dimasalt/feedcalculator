
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //const body = await request.json();   

    //get user token
    const cookie = request.cookies.get('token');
    const userToken:string = cookie?.value ?? '';

    //prisma client
    //const prisma = new PrismaClient();
    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        errorFormat: 'pretty'
    });

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



        //console.log("Feeds found:", feeds.length);      
         // Convert any BigInt values to regular numbers
        // const safeFeeds = feeds.map(feed => {
        //     // Create a new plain object with all properties converted to safe types
        //     return Object.fromEntries(
        //         Object.entries(feed).map(([key, value]) => {
        //             // Convert BigInt to Number if needed
        //             if (typeof value === 'bigint') {
        //                 return [key, Number(value)];
        //             }
        //             return [key, value];
        //         })
        //     );
        // });

        //console.log("Safe Feeds found:", safeFeeds);
       return new NextResponse(JSON.stringify({data: [feeds]}));
       //return NextResponse.json({data: [feeds]}, {status: 200});
     //return NextResponse.json({data: safeFeeds}, {status: 200});

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