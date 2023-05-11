import {createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const rapidApiKey = import.meta.env.VITE_REACT_APP_DEEZER_API_RAPID_API_KEY;
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '9bece3b8fdmsh89b1642ae0498dap1cd0d2jsnefcbd32769b3',
//       'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// api tester 


export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (id) => ({
        url: `playlist/${id}`,
      }),
    }),
    getTopArtists: builder.query({
      query: () => ({
        url: `search/`,
        params: {q: 'drake'},
      }),
    }),
    getSong: builder.query({
      query: (songid) => ({
        url: `track/${songid}`,
      }),
    }),
    getrelatedsongs: builder.query({
      query: (songName) => ({
        url: 'search/',
        params: {q: songName},
      }),
    }),
    getsongsgenre: builder.query({
      query: (genreListId) => ({
        url: 'search/',
        params: {q: genreListId},
      }),
    }),
    getArtist: builder.query({
      query: (artistId) => ({
        url: `artist/${artistId}`,
      }),
    }),
  }),
});


export const {useGetTopChartsQuery, useGetTopArtistsQuery,useGetSongQuery,useGetrelatedsongsQuery,useGetArtistQuery,useGetsongsgenreQuery} = deezerApi