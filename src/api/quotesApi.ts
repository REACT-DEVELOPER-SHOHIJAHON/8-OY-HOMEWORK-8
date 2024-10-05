import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quotesApi = createApi({
  reducerPath: 'quotesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getQuotes: builder.query<any, void>({
      query: () => 'quotes',
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApi;
