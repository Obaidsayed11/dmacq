
import React from 'react';
import { Heart, Calendar, User, Loader2 } from 'lucide-react';

const PostCard = ({ post, onLike, isLiking }) => {
  const handleLike = () => {
    onLike(post._id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {post.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content || post.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            {post.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isLiking 
                ? 'bg-gray-100 cursor-not-allowed' 
                : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
            }`}
          >
            {isLiking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Heart className="w-4 h-4" />
            )}
            <span className="font-medium">{post.likes || 0}</span>
          </button>
          
          {/* <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
            Read More
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;