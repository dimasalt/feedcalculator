
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

  

/** gets list of feeds to the list */
export const POST = async(request: NextRequest)=>  {

    //get variables
    const body = await request.json();       
    
     //get user token
     const cookie = request.cookies.get('token');
     const userToken:string = cookie?.value ?? '';
    //const userToken: string = '1';

    //prisma client
    const prisma = new PrismaClient();

    try {
        const feeds = await prisma.feed.findMany({               
            where: {
                feed_to_user: {
                    some: {
                        user_token: userToken                        
                    }
                }
            },
            include: {                
                feed_to_user: {
                    where: {
                        user_token: userToken
                    },
                    select: {
                        id: true,
                        user_token: true,
                        feed_id: true                      
                    }
                }
            },
            orderBy: {
                id: 'asc'
            }
        });

        // console.log(JSON.stringify({data: feeds}, 0, 2));        

        return new NextResponse(JSON.stringify({data: [feeds]}));   
    }
    catch(error){     
        return new NextResponse(JSON.stringify({data: []}));   
    }
    finally{
        //disconnect prisma
        await prisma.$disconnect();
    }

    // try {
    //     const [rows, fields] = await promisePool.query('call feedGetSelected(?)', [
    //         userToken
    //     ]);
             
    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 