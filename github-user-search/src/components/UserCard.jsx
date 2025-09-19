// src/components/UserCard.jsx
import { useState, useEffect } from "react";
import { getUserDetails } from "../services/githubService";

const UserCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await getUserDetails(user.login);
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user.login]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* User Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
          />
          {userDetails?.type && (
            <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              {userDetails.type}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {userDetails?.name || user.login}
          </h3>
          <p className="text-sm text-gray-500 truncate">@{user.login}</p>
          {userDetails?.company && (
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <svg
                className="w-4 h-4 mr-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-1a1 1 0 011-1h1a1 1 0 011 1v1m-4 0V8a1 1 0 011-1h1a1 1 0 011 1v13M9 7h1m0 0h1m0 0h1"
                />
              </svg>
              {userDetails.company}
            </p>
          )}
        </div>
      </div>

      {/* User Bio */}
      {userDetails?.bio && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {userDetails.bio}
        </p>
      )}

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-5 w-8 mx-auto rounded"></div>
            ) : (
              userDetails?.public_repos?.toLocaleString() || "0"
            )}
          </div>
          <div className="text-xs text-gray-500">Repos</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-5 w-8 mx-auto rounded"></div>
            ) : (
              userDetails?.followers?.toLocaleString() || "0"
            )}
          </div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-5 w-8 mx-auto rounded"></div>
            ) : (
              userDetails?.following?.toLocaleString() || "0"
            )}
          </div>
          <div className="text-xs text-gray-500">Following</div>
        </div>
      </div>

      {/* Location and Join Date */}
      <div className="space-y-2 mb-4">
        {userDetails?.location && (
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{userDetails.location}</span>
          </div>
        )}

        {userDetails?.created_at && (
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined {formatDate(userDetails.created_at)}</span>
          </div>
        )}
      </div>

      {/* Blog/Website */}
      {userDetails?.blog && (
        <div className="mb-4">
          <a
            href={
              userDetails.blog.startsWith("http")
                ? userDetails.blog
                : `https://${userDetails.blog}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 truncate"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="truncate">{userDetails.blog}</span>
          </a>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>Profile</span>
        </a>

        {userDetails?.public_repos > 0 && (
          <a
            href={`${user.html_url}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Repos</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default UserCard;
