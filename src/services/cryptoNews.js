import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_API_KEY,
  "x-rapidapi-host": "google-news13.p.rapidapi.com",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "CryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) =>
        createRequest(`/search?keyword=${newsCategory}&lr=en-US`),
      transformResponse: (response, meta, arg) => {
        // Use the `count` from the query argument to slice the results
        const { count = 100 } = arg; // Default to 10 if count is not provided
        return response?.items?.slice(0, count) || [];
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
