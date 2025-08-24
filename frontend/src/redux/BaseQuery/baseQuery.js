import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/api/",
        credentials: 'include',
    prepareHeaders: (
        headers, { getState}) => {
            headers.set("Accept", "application/json");
            const bearerAccessToken = getState().auth?.token;
            if (bearerAccessToken) {
                headers.set("Authorization", `Bearer ${bearerAccessToken}`);
            }
            return headers;
        },
    }),
    
tagTypes: ["Posts", "Post"], // add tags for cache updates
        endpoints: () => ({}),
});


export default BaseApi;

