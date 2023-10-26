import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "./apiSlice";


let store = configureStore({
    reducer: {
        apiCall: apiReducer
    }
})

export default store