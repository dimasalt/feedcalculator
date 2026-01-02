import prisma from "@/lib/prisma";

/**
 * ***********************************************************************
 * @description Function runs on first of every month and maintains our feed table by removing old feeds and updating feed_date for current user
 * @param userToken 
 * @returns nothing
 * ***********************************************************************
 */

export const runOnFirstOfMonth = async(userToken: string) => {

    try 
    {
        //lets update feed_date for all the feeds in feed table that have same user token as user token
        //we don't want this functionality to run async as we want to make sure that all existing feeds updated before we delete old feeds        
        prisma.feed.updateMany({
            where: {
                user_token: userToken
            },
            data: {
                feed_date: new Date()
            }
        });


        //first we need to remove a prisma query all feeds that are older than 1 months and default = 0 and token is same as user token
        prisma.feed.deleteMany({
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
    } catch (error) {}
}