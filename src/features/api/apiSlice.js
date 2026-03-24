import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";


export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"https://69c2ac2a7518bf8facbf2a8d.mockapi.io"}),
    tagTypes:["Task"],
    endpoints:(builder)=>({})
})