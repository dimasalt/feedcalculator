import { Metadata } from 'next';

import { ReduxProvider } from '../redux/provider'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer';

import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import CookiesComponent from '@/components/cookies/Cookies';



export const metadata: Metadata = {
  title: 'Feed Calculator',
  keywords: ['Cattle feed ration calculator', 'Cattle feed', 'Cattle feed calculator', 'Steer feeding ration']
  // icons: {
  //   icon: '/assets/cow-32x32.png'
  // }
};


export default function RootLayout({ children, }: { children: React.ReactNode}) 
{
  return (
    <>
      <html lang="en">
        <head>           
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="Farm and Beef cattle management software" />
          <meta name="keywords" content="Cattle feed ration calculator, Cattle feed, Cattle feed calculator, Steer feeding ration" />
          <meta name="author" content="Dmitri Saltanovich from Northern Farm" />
          <meta name="generator" content="" />
          <meta name="robots" content="index, follow, cache" />
          {/* <title></title> */}       

          <link rel="icon" type="image/png" href="/assets/cow-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/assets/cow-32x32.png" sizes="32x32" />

          {/* <!-- Header scripts --> */}
        </head>
        <body>
			
        {/* <!-- cookie component to initiate cookies every time on every page --> */}
        <CookiesComponent />

            {/* <!-- Navbar --> */}
            <Navbar />

            {/* <!-- main body --> */}
            <main role="main">        		  	 
                {/* <!-- page content --> */}             
                <ReduxProvider>			  
                  {children}
                </ReduxProvider>

            </main>
            {/* <!-- Footer --> */}
            <Footer />

            <Toaster />
        </body>
      </html> 
    </>
  )
}
