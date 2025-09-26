import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, PageLoadingSkeleton } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        const allPosts = posts.documents;

        // Set featured post to the most recent one
        if (allPosts.length > 0) {
          setFeaturedPost(allPosts[0]);
          setPosts(allPosts.slice(1));
        } else {
          setPosts([]);
        }
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <PageLoadingSkeleton type="posts" />;
  }

  if (posts.length === 0 && !featuredPost) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b to-blue-900">
        <Container className="mx-auto" background>
          <div className="text-center max-w-2xl mx-auto p-10">
            <div className="relative mb-8 mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4 animate-fadeIn">
              No Stories Yet
            </h1>
            <p className="text-blue-700 mb-8 max-w-md mx-auto leading-relaxed">
              Ready to share your thoughts with the world? Login to create your
              first blog post and join our community of writers.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Start Writing
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 mx-auto">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <div className="bg-blue-900 text-white md:mx-8 lg:mx-32 rounded-2xl my-8">
          <Container className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Featured Post Details */}
              <div className="space-y-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-blue-100">
                  Featured Post
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {featuredPost.title}
                </h1>
                <p className="text-blue-100 text-lg">
                  {featuredPost.content
                    ? featuredPost.content
                        .substring(0, 100)
                        .replace(/<[^>]*>/g, "") + "..."
                    : ""}
                </p>
                <Link
                  to={`/post/${featuredPost.$id}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Read Article
                </Link>
              </div>

              {/* Featured Image */}
              <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                {featuredPost.featuredImage && (
                  <img
                    src={appwriteService.getFileView(
                      featuredPost.featuredImage
                    )}
                    alt={featuredPost.title}
                    className="w-full h-72 object-cover"
                  />
                )}
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Latest Articles Grid */}
      <Container background className="mt-4 pb-4">
        <div className="pb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 border-b pb-4">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {posts.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
