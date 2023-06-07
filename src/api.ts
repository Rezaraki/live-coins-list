import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { TFootbalMatches } from './types/TFootbalMatches';
import { TAllMatches } from './types/TAllMatches';

 
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://core-sport-api.zarebin.ir/api/football' }),
  endpoints: (builder) => ({
    getFixtures: builder.query<TAllMatches, string>({
      query: (date) =>({
        url: '/fixtures/',
        params: { date },
      })  ,
      transformResponse:  (response:TFootbalMatches) =>{ return response.all },
    }),
  }),
})
 
 
export const { useGetFixturesQuery } = api