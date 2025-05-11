import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


  
export const POST = async(request: NextRequest)=>  {
    //const body = await request.json();

    const prisma = new PrismaClient();

    try {
        const adgs = await prisma.feed_requirement.findMany({
            select: {                
                adg: true
            },
            distinct: ['adg']
        });
        return new NextResponse(JSON.stringify({data: [adgs]}));   
    }
    catch(error){
        return new NextResponse(JSON.stringify({data: []}));   
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }


    //old sql query
    // try {
    //     const [rows,fields] = await promisePool.query('call feedGetRequirementsAdg()', []);
    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 