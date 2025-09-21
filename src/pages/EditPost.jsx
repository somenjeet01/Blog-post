import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-bl from-blue-200 via-blue to-blue-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-60 bg-gray-200 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen py-12 bg-gradient-to-bl from-blue-50 via-white to-blue-50">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Edit Article
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Update your article content, title, or featured image. Make your
            content even better with these editing tools.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
