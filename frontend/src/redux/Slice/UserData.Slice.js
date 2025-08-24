import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {}
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SetUserData: (state,action) => {
            state.data = action.payload || {};
        },
        RemoveUserData: (state) => {
            state.data = {}
        }
    }
});

export const { SetUserData, RemoveUserData} = userSlice.actions;

export default userSlice.reducer;