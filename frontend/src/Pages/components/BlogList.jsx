import React, { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import {
  useGetPostsQuery,
  useGetPostQuery,
  useSearchPostsQuery,
  useLikePostMutation,
} from "../../redux/ApiSlice/Post.Slice";
import PostCard from "./PostCard";
import SearchHeader from "./SearchHeader";
import { toast } from "sonner";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const PostSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-20 bg-gray-200 rounded mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);


const SearchResultPost = ({ postId, onLike, isLiking }) => {
  const { data: postData, isLoading, error } = useGetPostQuery(postId);
  
  if (isLoading) return <PostSkeleton />;
  if (error) return null;
  if (!postData?.data) return null;
  
  return (
    <PostCard
      post={postData.data}
      onLike={onLike}
      isLiking={isLiking}
    />
  );
};

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isInfiniteScrollMode, setIsInfiniteScrollMode] = useState(true);
  const [actualTotalPages, setActualTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  
  const queryParams = {
    page: currentPage,
  };

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: postsError,
    isFetching,
  } = useGetPostsQuery(queryParams, {
    skip: debouncedSearchTerm.trim() !== "", 
    refetchOnMountOrArgChange: true,
  });


  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSearchPostsQuery(debouncedSearchTerm, {
    skip: debouncedSearchTerm.trim() === "" || debouncedSearchTerm.trim().length < 2, 
  });

  const [likePost] = useLikePostMutation();
  const [likingPostIds, setLikingPostIds] = useState(new Set());

 
  useEffect(() => {
    if (debouncedSearchTerm.trim() && debouncedSearchTerm.trim().length >= 2) {
      setIsSearching(true);
      setCurrentPage(1);
      setAllPosts([]);
      setIsInfiniteScrollMode(false);
    } else {
      setIsSearching(false);
      setCurrentPage(1);
      setAllPosts([]);
      setIsInfiniteScrollMode(true);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

 
  useEffect(() => {
    if (searchData?.data?.posts) {
      setSearchResults(searchData.data.posts);
    }
  }, [searchData]);


  useEffect(() => {
    if (postsData?.data?.data && !debouncedSearchTerm.trim()) {
      const newPosts = postsData.data.data;

      if (isInfiniteScrollMode && currentPage > 1) {
        setAllPosts((prev) => {
          const filteredNewPosts = newPosts.filter(
            (newPost) =>
              !prev.some((existingPost) => existingPost._id === newPost._id)
          );
          return [...prev, ...filteredNewPosts];
        });
      } else {
        setAllPosts(newPosts);
      }

      setHasMorePages(newPosts.length === 10);
      setIsLoadingMore(false);

      if (typeof postsData.data.totalPages === "number") {
        setTotalPages(postsData.data.totalPages);
        setActualTotalPages(postsData.data.totalPages);
      }
    }
  }, [postsData, currentPage, isInfiniteScrollMode, debouncedSearchTerm]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
      hasMorePages &&
      !isLoadingMore &&
      !isFetching &&
      !searchTerm.trim()
    ) {
      handleInfiniteScroll();
    }
  }, [hasMorePages, isLoadingMore, isFetching, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    setIsInfiniteScrollMode(false);
    setCurrentPage(newPage);
    if (!debouncedSearchTerm.trim()) {
      setAllPosts([]);
    }
    setIsLoadingMore(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInfiniteScroll = () => {
    if (hasMorePages && !isLoadingMore && !isFetching && !searchTerm.trim()) {
      setIsInfiniteScrollMode(true);
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handleLike = async (postId) => {
    setLikingPostIds((prev) => new Set([...prev, postId]));

    try {
      await likePost(postId).unwrap();
      toast.success("Post liked successfully!");

      // Update posts in regular list
      setAllPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
        )
      );
    } catch (error) {
      console.error("Failed to like post:", error);
      toast.error("Failed to like post");
    } finally {
      setLikingPostIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if ((isLoadingPosts || isLoadingSearch) && allPosts.length === 0 && searchResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            {isSearching ? "Searching posts..." : "Loading posts..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (postsError || searchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">Failed to load posts</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

 
  const showSearchResults = debouncedSearchTerm.trim() !== "" && debouncedSearchTerm.trim().length >= 2;
  const hasContent = showSearchResults ? searchResults.length > 0 : allPosts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        resultsCount={
          showSearchResults 
            ? searchResults.length 
            : postsData?.data?.totalPosts || 0
        }
        currentPage={currentPage}
        hasNextPage={
          showSearchResults 
            ? false 
            : isInfiniteScrollMode
            ? hasMorePages
            : actualTotalPages > 0
            ? currentPage < actualTotalPages
            : hasMorePages
        }
        hasPrevPage={showSearchResults ? false : currentPage > 1}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        isSearching={showSearchResults}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasContent ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {showSearchResults
                ? 
                  searchResults.map((result) => (
                    <SearchResultPost
                      key={result._id}
                      postId={result._id}
                      onLike={handleLike}
                      isLiking={likingPostIds.has(result._id)}
                    />
                  ))
                : 
                  allPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onLike={handleLike}
                      isLiking={likingPostIds.has(post._id)}
                    />
                  ))}
            </div>

           
            {isLoadingMore && !showSearchResults && (
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-purple-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-lg">Loading more posts...</span>
                </div>
              </div>
            )}

            
            {!hasMorePages && !showSearchResults && allPosts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  You've reached the end! 🎉
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-xl mb-2">
              {showSearchResults ? "No posts found" : "No posts available"}
            </p>
            <p className="text-gray-400">
              {showSearchResults
                ? `No posts match "${debouncedSearchTerm}"`
                : "Check back later"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;