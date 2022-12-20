import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const taskApi = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/"
    }),
    tagTypes: ["Tasks"],
    endpoints: (build) => ({
        fetchAllTasks: build.query({
            query: () => ({
                url: "/tasks"
            }),
            providesTags:  ["Tasks"]

        }),
        fetchTasksByStatus: build.query({
            query: (status) => ({
                url: `/tasks?status=${status}`,
            }),
            providesTags: ["Tasks"]

        }),
        deleteTask: build.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/tasks/${id}`
            }),
            invalidatesTags: ["Tasks"]
        }),
        createTask: build.mutation({
            query: (task) => ({
                method: "POST",
                url: `/tasks/`,
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        changeStatusTask: build.mutation({
            query(data){
                const {id, body} = data
                return {
                    method:"PUT",
                    url:`/tasks/${id}`,
                    body
                }
                },
            invalidatesTags: ["Tasks"]

        })
    })
})