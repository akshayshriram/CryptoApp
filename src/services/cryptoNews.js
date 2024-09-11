import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_API_KEY,
  "x-rapidapi-host": "crypto-update-live.p.rapidapi.com",
};

const baseUrl = import.meta.env.VITE_BASE_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "CryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () =>
        createRequest(`/news`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
