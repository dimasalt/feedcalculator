import { Feed } from "./Feed";
import { Ration } from "./Ration";


//calculator input information
export interface CalcInData {
    
    selectedAdg: string,
    startWeight: string,
    endWeight: string,
    heads: number,
    selectedFeeds: Feed[],
    ration: Ration[],
    normalizedFeeds: Feed[]
}