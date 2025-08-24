import BaseApi from "../BaseQuery/baseQuery";

export const userApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query({
            query: () => ({
                url: 'users/userInfo',
                method: 'Get',
            })
        })

    })
})

export const { useUserInfoQuery } = userApi;