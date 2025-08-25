import BaseApi from "../BaseQuery/baseQuery";

export const PostApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getPosts: builder.query({
  query: ({ page = 1, search = '' }) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (search.trim()) {
      params.append('search', search);
    }
    return `posts?${params.toString()}`;
  },
  providesTags: (result) =>
    result?.posts
      ? [
          ...result.posts.map((p) => ({ type: "Post", id: p._id })),
          { type: "Posts", id: "LIST" },
        ]
      : [{ type: "Posts", id: "LIST" }],
}),

    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, err, id) => [{ type: "Post", id }],
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `likepost/${id}`,
        method: "PUT",
      }),

      invalidatesTags: (result, err, id) => [
        { type: "Post", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useLikePostMutation } =
  PostApi;
