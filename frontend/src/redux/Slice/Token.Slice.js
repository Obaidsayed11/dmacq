import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    token: Cookies.get('accessToken') || null,
    data:{}
};

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        LoginSetToken: (state,action) => {
            state.token = Cookies.get('accessToken') || action.payload?.token || null;
            state.data = action.payload?.data || {};
        },
        logoutResetToken : (state) => {
            state.token = null;
            state.data = {};
            Cookies.remove('accessToken')
        },
    },
});

export const { LoginSetToken, logoutResetToken } = authSlice.actions;
export default authSlice.reducer;