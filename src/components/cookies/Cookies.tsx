'use client';

import cookies from 'js-cookie';
import crypto from 'crypto';


/**
 * -----------------------------------------------------------------
 * @description sets or renews (if exist) a cookie with use token
 * @returns null
 * -----------------------------------------------------------------
 */
const CookiesComponent = () => {   

    // user token
    let token: string;

    //if cookie doesn't exit create new token
    if (cookies.get('token') === undefined)
    {
        let appKey:string = process.env.DATA_API_KEY?.toString() ?? '';
        let random:string = Math.random().toString(36).substring(2);
        
        token = crypto.createHash('sha256').update(appKey + random).digest('hex');
    }       
    else { // otherwise just read the token from existing cookie
        token = cookies.get('token')!;         
    }

    //set cookie
    cookies.set('token', token, { expires: 30, path: '/', sameSite: 'strict' } );     
  
    return null;
    // return(<></>)
}

export default CookiesComponent;