
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

        //if condition to run this part of code on first of every month
        if(new Date().getDay() === 1){
            await runOnFirstOfMonth(userToken);
        }
    

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


//a function that will run on first of every month
//and will maintain our feed table by removing old feeds and updating feed_date for current user
const runOnFirstOfMonth = async(userToken: string) => {

    //prisma client
    const prisma = new PrismaClient();

    try 
    {
        //lets update feed_date for all the feeds in feed table that have same user token as user token
        await prisma.feed.updateMany({
            where: {
                user_token: userToken
            },
            data: {
                feed_date: new Date()
            }
        });


        //first we need to remove a prisma query all feeds that are older than 1 months and default = 0 and token is same as user token
        await prisma.feed.deleteMany({
            where: {   
                NOT: {
                    user_token: userToken,
                },                           
                feed_date: {
                    lte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                },
                is_default: 0
            }
        });
            
            return true;
        } catch (error) {
            return false;
        }
}