import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";





export const POST = async(request: NextRequest)=>  {
    //const body = await request.json();

    const prisma = new PrismaClient();

    try {
        const weights = await prisma.feed_requirement.findMany({
            select: {                
                weight: true
            },
            distinct: ['weight']
        });
        return new NextResponse(JSON.stringify({data: [weights]}));   
    }
    catch(error){
        return new NextResponse(JSON.stringify({data: []}));   
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }

    // try {
    //     const [rows,fields] = await promisePool.query('call feedGetRequirementsWeight()', []);
    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 