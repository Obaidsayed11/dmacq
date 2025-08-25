
import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useLogoutUserMutation } from "../../redux/Slice/Auth.Slice";
import { logoutResetToken } from "../../redux/Slice/Token.Slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const SearchHeader = ({
  searchTerm,
  onSearchChange,
  resultsCount,
  currentPage,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  totalPages,
  showPagination = true,
}) => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      Cookies.remove("token");
      dispatch(logoutResetToken());
      toast.success("User Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-purple-600">Blog Posts</h1>

          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={onSearchChange}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
          <button
            className="group flex items-center justify-start w-11 h-11 bg-purple-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            onClick={() => setShowConfirm(true)}
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Logout
            </div>
          </button>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white border rounded-lg shadow relative max-w-sm w-full mx-4">
             
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 pt-0 text-center">
                <svg
                  className="w-20 h-20 text-red-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                  do you really want to logout?
                </h3>

                {/* Yes */}
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    handleLogout();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-4 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>

                {/* No */}
                <button
                  onClick={() => setShowConfirm(false)}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-4 py-2.5 text-center"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {searchTerm.trim() && (
          <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
            <p className="text-purple-700">
              {resultsCount > 0
                ? `Found ${resultsCount} post${
                    resultsCount !== 1 ? "s" : ""
                  } matching "${searchTerm}"`
                : `No posts found matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {showPagination && !searchTerm.trim() && (
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={!hasPrevPage}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                    hasPrevPage
                      ? "border-gray-300 hover:bg-white text-gray-700"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <span className="px-4 py-2 text-sm text-gray-600">
                  Page {currentPage} {totalPages && `of ${totalPages}`}
                </span>

                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={!hasNextPage}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors ${
                    hasNextPage
                      ? "border-gray-300 hover:bg-white text-gray-700"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm text-gray-500">10 posts per page</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
