import prisma from "@/lib/prisma";
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

} 