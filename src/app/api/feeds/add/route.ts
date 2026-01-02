
import { NextRequest, NextResponse } from "next/server";
import { Feed } from '../../../../types/Feed';
import prisma from "@/lib/prisma";

  
/** Adding new feed to the list */
export const POST = async(request: NextRequest) =>  {
    const body = await request.json();   

    const feedItem: Feed = body;

    //get user token
    const cookie = request.cookies.get('token');
    const userToken:string = cookie?.value ?? '';

    try 
    {
        const feed = await prisma.feed.create({
            data: {
                feed_name: feedItem.feed_name,
                feed_cp: parseInt(feedItem.feed_cp.toString()),
                feed_tdn: parseInt(feedItem.feed_tdn.toString()),
                feed_dm: parseInt(feedItem.feed_dm.toString()),
                feed_type: feedItem.feed_type,
                feed_usage: parseInt(feedItem.feed_usage.toString()),
                is_default: feedItem.is_default,
                user_token: userToken
            }
        });     

        return new NextResponse(JSON.stringify({data: true}));
        
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({data: false}));   
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }   
} 