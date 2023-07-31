
export interface CalcResultRation {    
    adg: number;
    dm: number;
    weight: number;
    grainLb: number;
    proteinLb: number;
    hayTotLb: number;
    grainTotLb: number;
    animalType: string;
    message: string;
}



export interface CalcResultFeedBulk {
    averageWeight: number;
    grainDaily: number;   
    proteinDaily: number; 
    hayDaily: number;
    dailyFeedBreakDown: FeedBreakDown[]
    proteinTwiceADay: number; 
    grainTwiceADay: number;
    hayTwiceADay: number;
    twiceDayFeedBreakDown: FeedBreakDown[]
}

export interface FeedBreakDown {
    feedName: string;
    feedVolume: number;
}