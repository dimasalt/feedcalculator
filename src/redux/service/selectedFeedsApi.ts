'use client';

import { Feed } from '@/types/Feed';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


//user selected feeds global state
export const selectedFeedsApi = createApi({
    reducerPath: 'selectedFeedsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/calculator/feeds' }),
    tagTypes: ['SelectedFeeds'],
    endpoints: (builder) => ({
        getSelectedFeeds: builder.query<Feed[], void>({
            query: () => ({ 
               url: '/get',
               method: 'POST',
               body: {}
            }),
            transformResponse: ( selectedFeeds:any ) => { 
                return selectedFeeds.data[0];                                                 
            },
            providesTags: ['SelectedFeeds'],       
        }),
        removeSelectedFeed: builder.mutation<void, number>({
            query: (id) => ({
                url: '/remove',
                method: 'POST',
                body: { id: id} 
            }),
            invalidatesTags: ['SelectedFeeds']
        }),
        addSelectedFeed: builder.mutation<void, number>({
            query: (id) => ({
                url: '/add',
                method: 'POST',
                body: { id: id} 
            }),
            invalidatesTags: ['SelectedFeeds']
        })
    })
});


export const { 
    useGetSelectedFeedsQuery,
    useRemoveSelectedFeedMutation,
    useAddSelectedFeedMutation 
} = selectedFeedsApi;