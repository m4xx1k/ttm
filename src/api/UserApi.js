import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/user"
    }),
    tagTypes: ["User"],
    endpoints: (build) => ({
        fetchUserTasks: build.query({
            query: (id) => `/${id}/tasks`,
            providesTags: ["User"]
        }),
        fetchUserStatuses: build.query({
            query: (id) => `/${id}/statuses`,
            providesTags: ["User"]
        }),
    })
})