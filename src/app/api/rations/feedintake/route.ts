import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";


  export interface SearchReqs {
    adg: number
    startWeight: number
    endWeight: number
  }
  

export const POST = async(request: NextRequest)=>  {
        
    const body: any = await request.json();

    //need to parse everything to int to avoid query errors
    body.adg = parseFloat(body.adg);
    body.startWeight = parseInt(body.startWeight);
    body.endWeight = parseInt(body.endWeight);

    //prisma client
    const prisma = new PrismaClient();

    try {     

      let requirements: any[] = [];

      if(body.adg === 0){
        requirements = await prisma.feed_requirement.findMany({
          where: {  
            AND: [
              {
                weight: {
                  gte: body.startWeight
                }
              },
              {
                weight: {
                  lte: body.endWeight
                }
              }
            ]
          },
          orderBy: [
            {
              weight: 'asc'
            },
            {
              adg: 'asc'
            }
          ]
        });        
      }
      else {
        requirements = await prisma.feed_requirement.findMany({
          where: {  
            AND: [
              {
                adg: body.adg
              },
              {
                weight: {
                  gte: body.startWeight
                }
              },
              {
                weight: {
                  lte: body.endWeight
                }
              }
            ]
          },
          orderBy: [
            {
              weight: 'asc'
            },
            {
              adg: 'asc'
            }
          ]
        });        
      }  
      
      //return final response
      return new NextResponse(JSON.stringify({data: [requirements]}));   
    }
    catch(error){
        //throw error;
        return new NextResponse(JSON.stringify({data: []}));   
    }
    finally
    {
        //close prisma client connection
        await prisma.$disconnect();
    }


    // try {
    //     const [rows, fields] = await promisePool.query('call feedGetRequirements(?,?,?)', [
    //         body.adg,
    //         body.startWeight,
    //         body.endWeight
    //     ]);

    //     return new NextResponse(JSON.stringify({data: rows}));   
    // }
    // catch(error){
    //     throw error;
    // }
} 