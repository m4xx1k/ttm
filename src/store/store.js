import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {taskApi} from "../api/TaskApi"

const rootReducer = combineReducers({
    [taskApi.reducerPath]: taskApi.reducer,
})

export  const setupStore = ()=> {
    return configureStore({
        reducer:rootReducer,
        middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(taskApi.middleware)
    })
}