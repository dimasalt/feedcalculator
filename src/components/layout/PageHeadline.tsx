import { memo } from 'react';

interface PageHeadlineProps {
    headline: string;
}

// const PageHeadline:FC<HeadLineText> = ({headline}) => {
const PageHeadline= ({headline}: PageHeadlineProps) => {
    return (
        <div className='container max-w-(--breakpoint-xl) mx-auto'>
            <div className='flex justify-between mt-11 border-b-2 pb-3'>
                <div className="flex justify-start">
                    <h2 className="text-slate-700 text-4xl">{headline}</h2>
                </div>                          
            </div>
        </div>
    )
}

export default memo(PageHeadline);