
// import promisePool from "@/utils/mysql";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //get variables
    const body = await request.json();       
    const id = body.id;

    //temporary token
    //const userToken:string = '1';

    //prisma client
    const prisma = new PrismaClient();

     //get user token
     const cookie = request.cookies.get('token');
     const userToken:string = cookie?.value ?? '';    

     try{
        await prisma.feed_to_user.create({
            data: {
                user_token: userToken,
                feed_id: id
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
    //     const [rows, fields] = await promisePool.query('call feedAddSelected(?, ?)', [
    //         id,
    //         userToken
    //     ]);

    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 