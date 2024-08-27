
// import promisePool from "@/utils/mysql";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //get variables
    const body = await request.json();       
    const id = parseInt(body.id.toString());

    //prisma client
    const prisma = new PrismaClient();

     try{
        await prisma.feed_to_user.delete({
            where: {
                id: id
            }
        });
        return new NextResponse(JSON.stringify({data: true}));
     }
     catch(error){
        return new NextResponse(JSON.stringify({data: false}));
     }
     finally{
        //disconnect prisma
        await prisma.$disconnect();
     }


    // try {
    //     const [rows, fields] = await promisePool.query('call feedDeleteSelected(?)', [
    //         id
    //     ]);

    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 