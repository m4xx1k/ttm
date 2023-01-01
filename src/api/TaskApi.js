import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const taskApi = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/tasks"
    }),
    tagTypes: ["Tasks"],
    endpoints: (build) => ({
        fetchTask: build.query({
            query: (id) => `/${id}`,
            providesTags:  ["Tasks"]
        }),
        fetchAllTasks: build.query({
            query: () => "/",
            providesTags:  ["Tasks"]

        }),
        fetchTasksByStatus: build.query({
            query: (status) => `?status=${status}`,
            providesTags: ["Tasks"]

        }),
        deleteTask: build.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/${id}`
            }),
            invalidatesTags: ["Tasks"]
        }),
        createTask: build.mutation({
            query: (task) => ({
                method: "POST",
                url: `/`,
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        changeTask: build.mutation({
            query(data){
                const {id, body} = data
                return {
                    method:"PUT",
                    url:`/${id}`,
                    body
                }},
            invalidatesTags: ["Tasks"]
        }),
        searchTasks: build.query({
            query:(search)=>`?q=${search}`
        })

    })
})