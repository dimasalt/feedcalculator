import Link from "next/link";


export default function NotFoundPage() {    
    return(
        <>
            <div className='container max-w-screen-xl mx-auto mt-7 flex justify-center'>               
                <h1 className="my-2 w-full text-gray-800 font-bold text-2xl">
                    Looks like you&apos;ve found the
                    doorway to the great nothing
                </h1>                               
            </div>
            <div className='container max-w-screen-xl mx-auto flex justify-center'>
                <p className="my-2 w-full text-gray-800">Sorry about that! Please <Link href="/" className="font-semibold text-green-700 underline"> visit our hompage </Link> to get where you need to go.</p>            
            </div>
        </>
    )
}