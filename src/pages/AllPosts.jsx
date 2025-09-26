import React, { useState, useEffect } from "react";
import { Container, PostCard, PageLoadingSkeleton } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 via-white to-blue-50 py-12">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            All Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover all our articles written by our talented community of
            writers. Find insights, tutorials, and stories on various topics.
          </p>
        </div>

        {loading ? (
          <PageLoadingSkeleton type="posts" />
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 mb-6">
              There are no articles published yet. Be the first to share your
              thoughts!
            </p>
            <Link
              to="/add-post"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {posts.map((post) => (
                <div key={post.$id} className="h-full">
                  <PostCard {...post} />
                </div>
              ))}
            </div>

            {posts.length > 0 && (
              <div className="mt-12 text-center">
                <Link
                  to="/add-post"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700"
                >
                  Create New Post
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
