import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogedIn: false,
    },
    reducers: {
        isUserLogedIn: (state) => {
           state.isLogedIn = true
        },
     
    }
})

export const { isUserLogedIn } = authSlice.actions;
export default authSlice.reducer;