import { feedSelectedService } from "@/services/calculator/feedSelectedService";
import { rationService } from "@/services/ration/rationService";
import { CalcInData } from "@/types/CalcInData";
import { CalcResultFeedBulk, CalcResultRation, FeedBreakDown } from "@/types/CalcResultData";
import { Feed } from "@/types/Feed";


/**
 * CalcResult ==> shows ration and segregation by feed
 * CalcResultBulk ==> show items in bulk and splits them by feed items
 */
let calcResult: CalcResultRation[];
let calcResultBulk: CalcResultFeedBulk;


export const calculateFeedRequirement = async(inputData : CalcInData) => {

    //reset result object/array
    calcResult = [];
    calcResultBulk = {
        averageWeight: 0,
        grainDaily: 0,
        proteinDaily: 0,
        hayDaily: 0,
        proteinTwiceADay: 0,
        grainTwiceADay: 0,
        hayTwiceADay: 0,
        dailyFeedBreakDown: [],
        twiceDayFeedBreakDown: []
    };
      
    try{
        const ration = await getRation(inputData.selectedAdg, inputData.startWeight, inputData.endWeight);       
        inputData.ration = ration;
        
        const selectedFeeds = await getUserSelectedFeeds() ;
        inputData.selectedFeeds = selectedFeeds;     

        //normalize feeds and segregate them by type
        inputData.normalizedFeeds = [];
        inputData.normalizedFeeds.push(Object.assign({}, normalizeFeeds(inputData, 'Grain')));
        inputData.normalizedFeeds.push(Object.assign({}, normalizeFeeds(inputData, 'Protein')));
        inputData.normalizedFeeds.push(Object.assign({}, normalizeFeeds(inputData, 'Hay')));

        
        //will assign requirements and results based on weight and ADG
        calculateRationReqirements(inputData);

        //calculate totals for a total right column
        calculateTotals(inputData);     
    }
    catch(error:any){
       console.log(error.message); 
    };


    //let resultRight = resetResult();
    return ({ rationResult : calcResult, bulkResult: calcResultBulk  });
};


// need to find average of feeds for everything    
// will need to calculate total of protein and tdn
const normalizeFeeds = (inputData: CalcInData, feedType: string = 'Grain'):Feed => {    

    let feedItem: Feed = {
        id : 0,
        feed_name: feedType,
        feed_type: feedType,
        feed_usage: 0,
        feed_cp: 0,
        feed_tdn: 0,
        feed_dm: 0
    };

    // don't need if here really
    // if(inputData.selectedFeeds.some((item) => item.feed_usage < 100 && item.feed_type === feedType)){        
    let partialFeedUsageArray: Feed[] = inputData.selectedFeeds.filter((item) => item.feed_usage < 100 && item.feed_type == feedType);
    let fullFeedUsageArray: Feed[] = inputData.selectedFeeds.filter((item) => item.feed_usage === 100 && item.feed_type == feedType);        


    //find averages for all feeds of serain type
    partialFeedUsageArray.forEach(function(item) {
        feedItem.feed_usage += item.feed_usage;
        feedItem.feed_cp += Math.round((item.feed_cp * (item.feed_usage / 100)));
        feedItem.feed_tdn += Math.round((item.feed_tdn * (item.feed_usage / 100))) ;
        feedItem.feed_dm += Math.round(item.feed_dm * (item.feed_usage / 100));
    });

    //how many feeds with usage of 100%
    let fullUsageCount: number = fullFeedUsageArray.length;
    //how much usage left after all the partial feeds
    let leftUsage: number = (100 - feedItem.feed_usage) / fullUsageCount;
    

    //find averages for all feeds of serain type
    fullFeedUsageArray.forEach(function(item) {
        feedItem.feed_usage += leftUsage;
        feedItem.feed_cp += Math.round((item.feed_cp * (leftUsage / 100)));
        feedItem.feed_tdn += Math.round((item.feed_tdn * (leftUsage / 100)));
        feedItem.feed_dm += Math.round((item.feed_dm * (leftUsage / 100)));

        //update and correct feed usage for 100% feeds in orinal input data
        let index = inputData.selectedFeeds.findIndex((x) => x.id === item.id);
        inputData.selectedFeeds[index].feed_usage = leftUsage; 
    });
   
    
    return feedItem;
}



//calculates ration required for each weight size
const calculateRationReqirements = async(inputData: CalcInData) => {   

    //define temporary variables for upcoming calculations
    let grainTemp:Feed, proteinTemp:Feed, hayTemp:Feed;
  

    //assign values to a temp feed variables
    inputData.normalizedFeeds.forEach(function(item:Feed){
       if(item.feed_type === 'Grain')
            grainTemp = Object.assign({}, item)          
       else if(item.feed_type === 'Protein')
            proteinTemp = Object.assign({}, item)         
       else if(item.feed_type === 'Hay')
            hayTemp = Object.assign({}, item)         
    });


    
    inputData.ration.forEach(function(item){

        // an object to hold temporary results
        let resultTemp:CalcResultRation = { 
            adg: 0,
            dm: 0,
            weight: 0, 
            grainLb: 0,         
            proteinLb: 0, 
            hayTotLb: 0,
            grainTotLb : 0, 
            animalType: '', 
            message: ''
        };

        let grainTotLb: number, 
            hayTotLb: number,
            grainRatio: number,
            hayRatio: number;

        //if no hay selected
        if(hayTemp.feed_cp === 0 && hayTemp.feed_tdn === 0){
            grainTotLb = item.dm_per_day;
            hayTotLb = 0;
            grainRatio = 100;
            hayRatio = 0;
        } // if no grain selected
        else if(grainTemp.feed_cp === 0 && grainTemp.feed_tdn === 0){
            grainTotLb = 0;
            hayTotLb = item.dm_per_day;
            grainRatio = 0;
            hayRatio = 100;
        } //otherwise if both grain and corn selected
        else{

            //calculate TDN %
            let grainSquare = grainTemp.feed_tdn - item.tdn;
            if (grainSquare < 0)
                grainSquare = grainSquare * (-1);
            
                
            let haySquare = hayTemp.feed_tdn - item.tdn;
            if (haySquare < 0)
                haySquare = haySquare * (-1);      
                
            
            grainRatio = haySquare / (haySquare + grainSquare);
            hayRatio = grainSquare / (haySquare + grainSquare);                     


            grainTotLb = grainRatio * item.dm_per_day;
            hayTotLb = hayRatio * item.dm_per_day;     


            /* round decimals */
            grainTotLb = Math.round(grainTotLb * 10) / 10;
            hayTotLb = Math.round(hayTotLb * 10) / 10;           
        }

        //assing values to a temporary result object
        resultTemp.weight = item.weight;
        resultTemp.grainTotLb = grainTotLb;
        resultTemp.hayTotLb = hayTotLb; 

        
        //calculate CP %
        let grainCP:number = grainRatio * grainTemp.feed_cp;       
        let hayCP:number = hayRatio * hayTemp.feed_cp;        


        let grainReqCP = (item.cp - hayCP);
        let grainNeededCP = (grainReqCP / grainRatio);          


        let grain_square_CP, protein_square_CP;
        grain_square_CP = grainTemp.feed_cp - grainNeededCP;
        protein_square_CP = proteinTemp.feed_cp - grainNeededCP;      
        
        //if lesser than 0    
        if(grain_square_CP < 0) 
            grain_square_CP = grain_square_CP * (-1);

        if(protein_square_CP < 0)
            protein_square_CP = protein_square_CP * (-1);               


        //let grain_ratio_CP, protein_ratio_CP;
        let grain_ratio_CP = protein_square_CP / (grain_square_CP + protein_square_CP);
        let protein_ratio_CP = grain_square_CP /  (grain_square_CP + protein_square_CP);       
    
        
        let grain_lb = grain_ratio_CP * grainTotLb;
        let protein_lb = protein_ratio_CP * grainTotLb;   
        
        
        /* round decimals */
        grain_lb = Math.round(grain_lb * 10) / 10;
        protein_lb = Math.round(protein_lb * 10) / 10;     


        resultTemp.grainLb = grain_lb;
        resultTemp.proteinLb = protein_lb;

        //add total dry matter needed and animal type
        resultTemp.dm = item.dm_per_day;
        resultTemp.animalType = item.animalType;
        
        //add ADG
        resultTemp.adg = item.adg;


        //asing result to the result array object CalcResultRationData       
        calcResult.push(resultTemp);      
    });

   return calcResult;
}

/**
 * --------------------------------------------------------------------------------
 * @description Function to calculate all the totals for daily feeding and twice a day feedings as well as breakdown by feeds
 * @param inputData 
 * @returns Nothing but updates CalcResultBulk
 * --------------------------------------------------------------------------------
 */
const calculateTotals = (inputData: CalcInData) => {

    //find average weight
    let averageWeightTemp: number = (parseInt(inputData.startWeight) + parseInt((inputData.endWeight))) / 2;
    if(averageWeightTemp % 100 > 0)  averageWeightTemp -= 50;

    //assigning average weight
    calcResultBulk.averageWeight = averageWeightTemp;   
    
    //find adg and everything else for a current average weight
    let currentRequirement:CalcResultRation = {
        adg: 0,
        dm: 0,
        weight: 0,
        grainLb: 0,
        proteinLb: 0,
        hayTotLb: 0,
        grainTotLb: 0,
        animalType: '',
        message: ''
    };
    
    calcResult.forEach(function(item){
        if(item.weight === averageWeightTemp)
            currentRequirement = item;
    });
  


    // //calculate daily grain
    calcResultBulk.grainDaily = currentRequirement.grainLb * inputData.heads;

    //daily protein intake
    calcResultBulk.proteinDaily = currentRequirement.proteinLb * inputData.heads;

    //daily hay
    calcResultBulk.hayDaily = currentRequirement.hayTotLb * inputData.heads;

    //protein twice a day
    calcResultBulk.proteinTwiceADay = calcResultBulk.proteinDaily / 2;

    //grain twice a day
    calcResultBulk.grainTwiceADay = calcResultBulk.grainDaily / 2;

    //hay twice a day
    calcResultBulk.hayTwiceADay = calcResultBulk.hayDaily / 2;

    //feed base breakdowns for ration
    let dailyFeedBreakdown: FeedBreakDown[] = [];
    let twiceDayFeedBreakDown: FeedBreakDown[] = [];

    inputData.selectedFeeds.forEach(function(item){
        if(item.feed_type === 'Grain'){
            //daily breakdown
            let dailyFeed: number = +(calcResultBulk.grainDaily * (item.feed_usage / 100)).toFixed(1);
            dailyFeedBreakdown.push({feedName: item.feed_name, feedVolume: dailyFeed});          

            let twiceADayFeed: number = +(calcResultBulk.grainTwiceADay * (item.feed_usage / 100)).toFixed(1);
            twiceDayFeedBreakDown.push({feedName: item.feed_name, feedVolume: twiceADayFeed});           
        }
        else if(item.feed_type === 'Protein'){
            //daily breakdown
            let dailyFeed: number = +(calcResultBulk.proteinDaily * (item.feed_usage / 100)).toFixed(1);
            dailyFeedBreakdown.push({feedName: item.feed_name, feedVolume: dailyFeed});          

            let twiceADayFeed: number = +(calcResultBulk.proteinTwiceADay * (item.feed_usage / 100)).toFixed(1);
            twiceDayFeedBreakDown.push({feedName: item.feed_name, feedVolume: twiceADayFeed});           
        }
        else if(item.feed_type === 'Hay'){
            //daily breakdown
            let dailyFeed: number = +(calcResultBulk.hayDaily * (item.feed_usage / 100)).toFixed(1);
            dailyFeedBreakdown.push({feedName: item.feed_name, feedVolume: dailyFeed});          

            let twiceADayFeed: number = +(calcResultBulk.hayTwiceADay * (item.feed_usage / 100)).toFixed(1);
            twiceDayFeedBreakDown.push({feedName: item.feed_name, feedVolume: twiceADayFeed});           
        }
    });

    calcResultBulk.dailyFeedBreakDown = dailyFeedBreakdown;
    calcResultBulk.twiceDayFeedBreakDown =  twiceDayFeedBreakDown;
}


/**
 * Get ration requirements for selected range by calling to a service
 */
const getRation = async(adg: string, startWeight: string, endWeight: string) => {
    
    try {
        const result = await rationService(adg, startWeight, endWeight);
        return result;
    }
    catch(error){
        console.log(error);
    }   
}


/**
 * Get user selected feeds by calling to a service
 */
const getUserSelectedFeeds = async() => {
    try {
        const result = await feedSelectedService();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}    



