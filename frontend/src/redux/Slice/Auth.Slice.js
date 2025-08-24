import BaseApi from '../BaseQuery/baseQuery.js';


export const AuthApi = BaseApi.injectEndpoints({
    endpoints :(builder) => ({
        
    registerUser: builder.mutation({
        query: (data) => ({
            url : 'register',
            method: 'POST',
            body : data
        })
    }),
        loginUser: builder.mutation({
            query : (data) => ({
                url : 'login',
                method : 'POST',
                body :  data
            })
        }),
        logoutUser: builder.mutation({
            query : () => ({
                url : 'logout',
                method : 'POST',
                
            })
        }),
})
});


export const {  useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = AuthApi;