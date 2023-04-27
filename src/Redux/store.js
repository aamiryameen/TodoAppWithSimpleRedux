import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Reducer/todoSlice";
import authSlice from "./Reducer/authSlice";

const store = configureStore({
    reducer: {
        todos: todoSlice,
        auth: authSlice
    }
})

export default store;   