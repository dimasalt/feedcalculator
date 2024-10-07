import '@testing-library/jest-dom'

import { calculateFeedRequirement } from '@/utils/calculator';
import { CalcInData } from '@/types/CalcInData';
import { Feed } from '@/types/Feed';
import { Ration } from '@/types/Ration';


// // mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as any;


describe('Calculator', () => {
  test('checks if feed calculations', async () => {

    const feeds: Feed[] = [{
        id: 1,
        feed_name: "Alfalfa",   
        feed_cp: 1,
        feed_tdn: 1,
        feed_dm: 1,
        feed_type: "grain",
        feed_usage: 1,
        user_token: "",
        user_selected: 0,
        is_default: 1,    
      },{
        id: 1,
        feed_name: "Alfalfa",   
        feed_cp: 1,
        feed_tdn: 1,
        feed_dm: 1,
        feed_type: "grain",
        feed_usage: 1,
        user_token: "",
        user_selected: 0,
        is_default: 1,    
      },{
        id: 1,
        feed_name: "Alfalfa",   
        feed_cp: 1,
        feed_tdn: 1,
        feed_dm: 1,
        feed_type: "grain",
        feed_usage: 1,
        user_token: "",
        user_selected: 0,
        is_default: 1,    
      },{
        id: 1,
        feed_name: "Alfalfa",   
        feed_cp: 1,
        feed_tdn: 1,
        feed_dm: 1,
        feed_type: "grain",
        feed_usage: 1,
        user_token: "",
        user_selected: 0,
        is_default: 1,    
      }
    ];
    

    const ration: Ration[] = [{
      id: 1,
      weight: 200,
      animalType: "steer",
      adg: 3,
      dm_per_day: 22,
      cp: 10,
      tdn: 10
    }];
    


    const calculatorInputData: CalcInData = {
      selectedAdg : "3",
      startWeight: "200",
      endWeight: "400",
      heads: 2,
      selectedFeeds: feeds,
      ration: ration,
      normalizedFeeds: []
    }

    let result: any = await calculateFeedRequirement(calculatorInputData);   
    //expect(result.).toBe(4);
  });
});



// export function mockFetch(data: any) {
//   return jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => data,
//     }),
//   );
// }

