import asyncHandler from "../Utils/AsyncHandler.js";
import ApiError from "../Utils/ApiError.js";
import ApiSuccess from "../Utils/ApiSuccess.js";
import Post from "../Models/Post.Model.js";



const allPostController = asyncHandler(async(req,res)=> {
   const page = parseInt(req.query.page) || 1;
   const limit = 10;
   const skip = (page - 1) * limit;
   const searchTerm = req.query.search || '';

   let searchQuery = {};
   if (searchTerm.trim()) {
       searchQuery = {
           title: { $regex: searchTerm, $options: 'i' }
       };
   }

   const totalPosts = await Post.countDocuments(searchQuery);
   
   const posts = await Post.find(searchQuery)
       .sort({ _id: 1 })
       .skip(skip)
       .limit(limit);

   const response = {
       data: posts,
       totalPosts: totalPosts,
       currentPage: page,
       totalPages: Math.ceil(totalPosts / limit),
       searchTerm: searchTerm
   };

   return res.status(200).json(new ApiSuccess(200, response, "Posts Fetched Successfully"));
});

const singlePostController = asyncHandler(async(req,res)=> {
    const post = await Post.findById(req.params.id);
    
    return res.status(200).json(new ApiSuccess(200, post))
})


const searchPostsController = asyncHandler(async(req, res) => {
    const searchTerm = req.query.search || '';
    
    if (!searchTerm.trim()) {
        return res.status(400).json(new ApiError(400, "Search term is required"));
    }
    
    const searchQuery = {
        title: { $regex: searchTerm, $options: 'i' }
    };
    
    // Only return _id and title for matched posts
    const matchedPosts = await Post.find(searchQuery)
        .select('_id title')
        .sort({ _id: 1 });
    
    const response = {
        posts: matchedPosts,
        totalResults: matchedPosts.length,
        searchTerm: searchTerm
    };
    
    return res.status(200).json(new ApiSuccess(200, response, "Search Results Fetched Successfully"));
});


//like post

const likePostController = asyncHandler(async(req,res) => {
    const post =  await Post.findById(req.params.id);
    if(!post) throw new ApiError(404, {
        message : "Post not found"
    })
    post.likes +=1;
    await post.save();
    console.log(post)

    return res.status(200).json(new ApiSuccess(200, post))


})


export default  {allPostController,singlePostController,searchPostsController, likePostController }